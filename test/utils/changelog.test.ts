// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  getAllReleases,
  getNewerOlderVersion,
  getGithubConstants,
  getReleaseContent
} from "@/utils/changelog";

const globalFetch = global.fetch;
const mockFetch = jest.fn();

beforeEach(() => {
  process.env.GH_USERNAME = "user";
  process.env.GH_REPO = "repo";
  process.env.GH_TOKEN = "token";

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
    delete process.env.GH_USERNAME;

    expect(() => getGithubConstants()).toThrow("Github username not found");
  });

  test("REPO env variable is not set", () => {
    delete process.env.GH_REPO;

    expect(() => getGithubConstants()).toThrow("Github repository not found");
  });

  test("TOKEN env variable is not set", () => {
    delete process.env.GH_TOKEN;

    expect(() => getGithubConstants()).toThrow("Github token not found");
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

describe("Test getChangelogVersionData", () => {
  beforeAll(() => {
    mockFetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue([
          { name: "2022.01.04" },
          { name: "2021.10.28" },
          { name: "2021.08.12" }
        ])
    });
  });

  test("First entry", async () => {
    const result = await getNewerOlderVersion("2022.01.04");

    expect(result).toMatchObject({
      newerData: null,
      olderData: {
        slug: `/changelog/2021.10.28/`,
        title: `2021.10.28`
      }
    });
  });

  test("Last entry", async () => {
    const result = await getNewerOlderVersion("2021.08.12");

    expect(result).toMatchObject({
      newerData: {
        slug: `/changelog/2021.10.28/`,
        title: `2021.10.28`
      },
      olderData: null
    });
  });

  test("Middle entry", async () => {
    const result = await getNewerOlderVersion("2021.10.28");

    expect(result).toMatchObject({
      newerData: {
        slug: `/changelog/2022.01.04/`,
        title: `2022.01.04`
      },
      olderData: {
        slug: `/changelog/2021.08.12/`,
        title: `2021.08.12`
      }
    });
  });
});
