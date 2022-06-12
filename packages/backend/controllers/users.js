const { Octokit } = require("@octokit/rest");
const { asyncHandler } = require("../middlewares/async");

// ROUTE: GET /users/:username
// DESCRIPTION: get publicly availabe information about someone on GitHub
// ACCESS: private

exports.getByUsername = asyncHandler(async (req, res, next) => {
    // create a new instance of octokit with users token
    const octokit = new Octokit({ auth: req.token });

    const user = await octokit.rest.users.getByUsername({
        username: req.params.username,
    });

    const { data, status } = user;
    res.status(200).json({ data, status });
});
