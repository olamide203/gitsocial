const { asyncHandler } = require("../middlewares/async");
const { Octokit } = require("@octokit/rest");

// ROUTE: GET /search/users
// DESCRIPTION: find users by username
// ACCESS: private

exports.searchUsers = asyncHandler(async (req, res, next) => {
    const octokit = new Octokit({ auth: req.token });

    const { data } = await octokit.rest.search.users({
        q: req.query.q,
        page: req.query.page || 1,
        per_page: req.query.limit || 20,
    });
    res.status(200).json({ status: 200, data });
});

// ROUTE: GET /search/repositories
// DESCRIPTION: find users by username
// ACCESS: private

exports.searchRepos = asyncHandler(async (req, res, next) => {
    const octokit = new Octokit({ auth: req.token });

    const { data } = await octokit.rest.search.repos({
        q: req.query.q,
        page: req.query.page || 1,
        per_page: req.query.limit || 20,
    });
    res.status(200).json({ status: 200, data });
});
