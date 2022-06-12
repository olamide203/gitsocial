const { Router } = require("express");
const { extractToken } = require("../middlewares/auth");
const { getByUsername } = require("../controllers/users");

const router = Router();

router.use("/", extractToken);

router.get("/:username", getByUsername);

module.exports = router;
