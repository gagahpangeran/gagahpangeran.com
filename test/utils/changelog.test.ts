// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  getAllReleases,
  getGithubConstants,
  getReleaseContent
} from "@/utils/changelog";

const globalFetch = global.fetch;
const mockFetch = jest.fn();

beforeEach(() => {
  process.env.GITHUB_USERNAME = "user";
  process.env.GITHUB_REPO = "repo";
  process.env.GITHUB_TOKEN = "token";

  global.fetch = mockFetch;
});

afterEach(() => {
  global.fetch = globalFetch;
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

describe("Test getAllReleases function", () => {
  test("success", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest
        .fn()
        .mockResolvedValueOnce([
          { name: "2022.01.23" },
          { name: "2021.11.09" },
          { name: "2021.05.27" },
          { name: "2020.03.11" }
        ])
    });

    const allReleases = await getAllReleases();

    expect(allReleases).toEqual(
      expect.arrayContaining([
        "2022.01.23",
        "2021.11.09",
        "2021.05.27",
        "2020.03.11"
      ])
    );
  });

  test("failed", async () => {
    mockFetch.mockRejectedValueOnce(new Error());

    expect(async () => {
      await getAllReleases();
    }).rejects.toThrow("Failed to fetch all github releases");
  });
});

describe("Test getReleaseContent function", () => {
  test("success", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        body: "# This is content"
      })
    });

    const content = await getReleaseContent("2022.01.02");
    expect(content).toBe("# This is content");
  });

  test("failed", async () => {
    mockFetch.mockRejectedValueOnce(new Error());

    expect(async () => {
      await getReleaseContent("2022.01.02");
    }).rejects.toThrow("Failed to fetch github releases");
  });
});
