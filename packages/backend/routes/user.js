import { Router } from "express";
import { extractToken } from "../middlewares/auth.js";
import { AdvancedQuery } from "../middlewares/AdvancedQuery.js";

import {
  getUser,
  getUserRepos,
  checkRepoIsStarredByAuthenticatedUser,
  starRepoForAuthenticatedUser,
  unstarRepoForAuthenticatedUser,
  listReposStarredByAuthenticatedUser,
  listFollowersForAuthenticatedUser,
  listFollowedByAuthenticated,
  checkPersonIsFollowedByAuthenticated,
  followForAuthenticatedUser,
  unfollowForAuthenticatedUser,
} from "../controllers/user.js";

// create router
const router = Router();

router.use("/", extractToken);
router.get("/", getUser);
router.get("/repos", AdvancedQuery("/user/repos"), getUserRepos);
router
  .route("/starred/:owner/:repo")
  .get(checkRepoIsStarredByAuthenticatedUser)
  .put(starRepoForAuthenticatedUser)
  .delete(unstarRepoForAuthenticatedUser);

router
  .route("/following/:username")
  .get(checkPersonIsFollowedByAuthenticated)
  .put(followForAuthenticatedUser)
  .delete(unfollowForAuthenticatedUser);
router.get(
  "/starred",
  AdvancedQuery("/user/starred"),
  listReposStarredByAuthenticatedUser,
);
router.get(
  "/followers",
  AdvancedQuery("/user/followers"),
  listFollowersForAuthenticatedUser,
);
router.get(
  "/following",
  AdvancedQuery("/user/following"),
  listFollowedByAuthenticated,
);

export default router;
