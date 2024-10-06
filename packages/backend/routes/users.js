import { Router } from "express";
import { extractToken } from "../middlewares/auth.js";
import { getByUsername } from "../controllers/users.js";

const router = Router();

router.use("/", extractToken);

router.get("/:username", getByUsername);

export default router;
