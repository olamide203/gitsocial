const { Router } = require("express");
const { extractToken } = require("../middlewares/auth");
const { AdvancedQuery } = require("../middlewares/AdvancedQuery");
const {
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
} = require("../controllers/user");

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
    listReposStarredByAuthenticatedUser
);
router.get(
    "/followers",
    AdvancedQuery("/user/followers"),
    listFollowersForAuthenticatedUser
);
router.get(
    "/following",
    AdvancedQuery("/user/following"),
    listFollowedByAuthenticated
);
module.exports = router;
