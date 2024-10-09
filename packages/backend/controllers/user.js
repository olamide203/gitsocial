import { asyncHandler } from "../middlewares/async.js";
import { Octokit } from "@octokit/rest";

// ROUTE: /user
// DESCRIPTION: get the current authenticated user
// ACCESS: private

export const getUser = asyncHandler(async (req, res, next) => {
  // create a new instance of octokit with the authenticated user credentials
  const octokit = new Octokit({
    auth: req.token,
  });
  // get the authenticated user
  const user = await octokit.rest.users.getAuthenticated();

  // get number of authenticated users orgs
  await octokit
    .paginate(octokit.rest.orgs.listForAuthenticatedUser)
    .then((orgs) => {
      user.data.organizations = orgs.length;
    });
  // get stars for the authenticated users
  await octokit
    .paginate(octokit.rest.activity.listReposStarredByAuthenticatedUser)
    .then((stars) => {
      user.data.stars = stars.length;
    });

  // destructure the status and data from the response
  const { data, status } = user;
  res.status(200).json({ data, status });
});

// ROUTE: /api/v1/user/repos
// DESCRIPTION: Get All repositories for the current authenticated user
// ACCESS: Private

export const getUserRepos = asyncHandler(async (req, res, next) => {
  const { data, pagination } = res.advancedResult;
  const repos = data.reduce((acc, curr) => {
    acc.push({
      html_url: curr.html_url,
      name: curr.name,
      description: curr.description,
      topics: curr.topics.slice(0, 3),
      stargazers_count: curr.stargazers_count,
      language: curr.language,
      forks_count: curr.forks_count,
      visibility: curr.visibility,
      homepage: curr.homepage,
      owner: {
        login: curr.owner.login,
      },
    });

    return acc;
  }, []);

  res.status(200).json({ status: 200, data: repos, pagination });
});

// ROUTE: /api/v1/user/starred/:owner/:repo
// DESCRIPTION: check if a repository is starred by the authenticated user
// ACCESS: private

export const checkRepoIsStarredByAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    // create a new instance of octokit with the users credentials
    const octokit = new Octokit({ auth: req.token });
    // check if repo is starred by user
    const { owner, repo } = req.params;
    let status, data;
    try {
      const result =
        await octokit.rest.activity.checkRepoIsStarredByAuthenticatedUser({
          owner,
          repo,
        });
      status = result.status;
    } catch (error) {
      status = error.response.status;
    }
    // if status code == 204, the repository is starred
    const isStarred = status === 204 ? true : false;
    res.status(200).json({ isStarred });
  },
);

// ROUTE: PUT  /user/starred/:owner/:repo
// DESCRIPTION: star a repository for the authenticated user
// ACCESS: private

export const starRepoForAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    // create a new instance of octokit with the users credentials
    const octokit = new Octokit({ auth: req.token });
    // destructure  owner and repo from the req parameters
    const { owner, repo } = req.params;
    try {
      await octokit.rest.activity.starRepoForAuthenticatedUser({
        owner,
        repo,
      });
      res.status(204).send();
    } catch (error) {
      const status = error.response?.status || 500;
      res.status(status).json({
        message:
          error.message || "An error occured while starring the repository",
      });
    }
  },
);

// ROUTE: DELETE  /user/starred/:owner/:repo
// DESCRIPTION: unstar a repository for the authenticated user
// ACCESS: private

export const unstarRepoForAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    // create a new instance of octokit with the users credentials
    const octokit = new Octokit({ auth: req.token });
    // destructure  owner and repo from the req parameters
    const { owner, repo } = req.params;
    try {
      await octokit.rest.activity.unstarRepoForAuthenticatedUser({
        owner,
        repo,
      });
      res.status(204).send();
    } catch (error) {
      const status = error.response?.status || 500;
      res.status(status).json({
        message:
          error.message || "An error occured while unstarring the repository",
      });
    }
  },
);

// ROUTE: GET /user/starred
// DESCRIPTION: list  repositories starred by the authenticated user
// ACCESS: Private

export const listReposStarredByAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResult);
  },
);

// ROUTE: GET /user/followers
// DESCRIPTION: list the people following the authenticated user
// ACCESS: private

export const listFollowersForAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResult);
  },
);

// ROUTE: GET /user/following
// DESCRIPTION: list the people who the authenticated user follows
// ACCESS: Private

export const listFollowedByAuthenticated = asyncHandler((req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// ROUTE: PUT /user/following/:username
// DESCRIPTION: Follow a user
// ACCESS: Private

export const followForAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    const octokit = new Octokit({ auth: req.token });
    try {
      await octokit.rest.users.follow({
        username: req.params.username,
      });
      res.status(204).send();
    } catch (error) {
      console.log(error);
      status = error.response?.status || 500;
      res.status(status).json({
        message: error.message || "An error occured while following user",
      });
    }
  },
);

// ROUTE: DELETE /user/following/:username
// DESCRIPTION: unfollow a user
// ACCESS: Private

export const unfollowForAuthenticatedUser = asyncHandler(
  async (req, res, next) => {
    const octokit = new Octokit({ auth: req.token });
    try {
      await octokit.rest.users.unfollow({
        username: req.params.username,
      });
      res.status(204).send();
    } catch (error) {
      const status = error.response?.status || 500;
      res.status(status).json({
        message: error.message || "An error occured while unfollowing user",
      });
    }
  },
);

// ROUTE: GET /user/following/:username
// DESCRIPTION: check if a person is followed by the authenticated user
// ACCESS: Private

export const checkPersonIsFollowedByAuthenticated = asyncHandler(
  async (req, res, next) => {
    const octokit = new Octokit({ auth: req.token });
    let status;
    try {
      const result =
        await octokit.rest.users.checkPersonIsFollowedByAuthenticated({
          username: req.params.username,
        });
      status = result.status;
    } catch (error) {
      status = error.response.status;
    }

    const isFollowed = status === 204 ? true : false;
    res.status(200).json({ isFollowed });
  },
);
