const { extractToken } = require("../middlewares/auth");
const { Router } = require("express");
const { searchUsers, searchRepos } = require("../controllers/search");

const router = Router();
router.use("/", extractToken);
router.get("/users", searchUsers);
router.get("/repositories", searchRepos);

module.exports = router;
