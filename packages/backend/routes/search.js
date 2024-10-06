import { extractToken } from "../middlewares/auth.js";
import { Router } from "express";
import { searchUsers, searchRepos } from "../controllers/search.js";

const router = Router();
router.use("/", extractToken);
router.get("/users", searchUsers);
router.get("/repositories", searchRepos);

export default router;
