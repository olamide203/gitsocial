const { Octokit } = require("@octokit/rest");

const AdvancedQuery = (path) => async (req, res, next) => {
    const { page, limit, ...options } = req.query;
    // create a new instance of octokit with the users credentials
    const octokit = new Octokit({ auth: req.token });
    let pageNumber = parseInt(page) || 1;
    const pagination = {
        limit: parseInt(limit) || 10,
    };
    let data;
    // paginate result
    await octokit.paginate(`GET ${path}`, options).then((starredRepos) => {
        pagination.total = starredRepos.length;
        const startIndex = (pageNumber - 1) * pagination.limit;
        const stopIndex = pageNumber * pagination.limit;
        data = starredRepos.slice(startIndex, stopIndex);
        if (startIndex) {
            pagination.prev = pageNumber - 1;
        }
        if (stopIndex < pagination.total) {
            pagination.next = pageNumber + 1;
        }
    });
    res.advancedResult = {
        status: 200,
        pagination,
        data,
    };
    next();
};

module.exports = { AdvancedQuery };
