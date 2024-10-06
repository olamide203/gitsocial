import { extractToken } from "../middlewares/auth";
import { Router } from "express";
import { getUserRepos } from "../controllers/repos";

const router = Router();

router.get("/me", extractToken, getUserRepos);

export default router;
