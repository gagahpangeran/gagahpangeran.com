// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getGithubConstants } from "../../src/utils/github";

beforeEach(() => {
  process.env.GITHUB_USERNAME = "user";
  process.env.GITHUB_REPO = "repo";
  process.env.GITHUB_TOKEN = "token";
});

describe("Test getGithubConstants function", () => {
  test("All env variable is set", () => {
    const { USER, REPO, TOKEN } = getGithubConstants();

    expect(USER).toBe("user");
    expect(REPO).toBe("repo");
    expect(TOKEN).toBe("token");
  });

  test("USER env variable is not set", () => {
    delete process.env.GITHUB_USERNAME;

    expect(() => getGithubConstants()).toThrowError(
      "Github username not found"
    );
  });

  test("REPO env variable is not set", () => {
    delete process.env.GITHUB_REPO;

    expect(() => getGithubConstants()).toThrowError(
      "Github repository not found"
    );
  });

  test("TOKEN env variable is not set", () => {
    delete process.env.GITHUB_TOKEN;

    expect(() => getGithubConstants()).toThrowError("Github token not found");
  });
});
