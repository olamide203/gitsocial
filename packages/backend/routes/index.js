import { Router } from "express";
import { asyncHandler } from "../middlewares/async.js";
import { encryptToken, decryptToken } from "../utils/cryptograph.js";
import { Octokit } from "@octokit/rest";
import {
  createOAuthAppAuth,
  createOAuthUserAuth,
} from "@octokit/auth-oauth-app";

const router = Router();

router.get(
  "/cb",
  asyncHandler(async (req, res, next) => {
    const appAuth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    // exchange code for access token
    const userAuth = await appAuth({
      type: "oauth-user",
      code: req.query.code,
      factory: createOAuthUserAuth,
    });
    const authentication = await userAuth();
    const { token } = authentication;
    const encryptedToken = encryptToken(token, process.env.SECRET_KEY).toString(
      "utf8",
    );
    res.cookie("session_id", encryptedToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }),
);

router.get(
  "/github",
  asyncHandler((req, res, next) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20public_repo`,
    );
  }),
);

router.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    // get the encrypted toke from the req cookies
    const encryptedToken = req.cookies.session_id;
    const token = decryptToken(encryptedToken, process.env.SECRET_KEY);

    // app authentication
    const appOctokit = new Octokit({
      authStrategy: createOAuthAppAuth,
      auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    });

    // revoke user's access token
    await appOctokit.request("DELETE /applications/{client_id}/grant", {
      client_id: process.env.CLIENT_ID,
      access_token: token,
    });
    res.cookie("session_id", encryptedToken, {
      maxAge: 10,
      httpOnly: true,
    });
    // redirect user to home page
    res.redirect(`${process.env.CLIENT_URL}`);
  }),
);

export default router;
