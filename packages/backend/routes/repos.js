const { extractToken } = require("../middlewares/auth");
const { Router } = require("express");
const { getUserRepos } = require("../controllers/repos");

const router = Router();

router.get("/me", extractToken, getUserRepos);
// router.get(
//     "/",
//     extractToken,
//     asyncHandler(async (req, res, next) => {
//         // create new instance of octokit
//         const octokit = new Octokit({
//             auth: req.token,
//         });
//         console.log(req.query);
//         const q = req.query.q;
//         // get repositories
//         const result = await octokit.rest.search.repos({
//             q,
//         });
//         console.log(result.data);
//     })
// );

module.exports = router;
