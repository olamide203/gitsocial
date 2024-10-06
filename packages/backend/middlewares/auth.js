import { asyncHandler } from "./async.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { decryptToken } from "../utils/cryptograph.js";

//extract access token from cookie
export const extractToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies.session_id;
  if (!token) {
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }
  // decrypt token
  try {
    token = decryptToken(token, process.env.SECRET_KEY);
  } catch (error) {
    res
      .cookie("session_id", "", {
        maxAge: 10,
        httpOnly: true,
      })
      .status(401)
      .send();
  }

  // append token to request object
  req.token = token;
  next();
});
