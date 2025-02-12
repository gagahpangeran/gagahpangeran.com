// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

export function getGithubConstants() {
  const BASE_URL = `https://api.github.com`;
  const USER = process.env.GH_USERNAME;
  const REPO = process.env.GH_REPO;
  const TOKEN = process.env.GH_TOKEN;

  if (USER == null) {
    throw Error("Github username not found");
  }

  if (REPO == null) {
    throw Error("Github repository not found");
  }

  if (TOKEN == null) {
    throw Error("Github token not found");
  }

  return { BASE_URL, USER, REPO, TOKEN };
}

type AllReleaseData = [{ name: string }] | undefined;

export async function getAllReleases() {
  const { BASE_URL, USER, REPO, TOKEN } = getGithubConstants();

  try {
    const endpoint = `${BASE_URL}/repos/${USER}/${REPO}/releases`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data: AllReleaseData = await response.json();
    const allReleases = data?.map(({ name }) => name) ?? [];

    return allReleases;
  } catch {
    throw Error("Failed to fetch all github releases");
  }
}

type ReleaseData = { body: string } | undefined;

export async function getReleaseContent(version: string) {
  const { BASE_URL, USER, REPO, TOKEN } = getGithubConstants();

  try {
    const endpoint = `${BASE_URL}/repos/${USER}/${REPO}/releases/tags/${version}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data: ReleaseData = await response.json();
    const content = data?.body;

    return content;
  } catch {
    throw Error("Failed to fetch github releases");
  }
}

export async function getNewerOlderVersion(currentVersion: string) {
  const allReleases = await getAllReleases();

  const index = allReleases.findIndex(version => version === currentVersion);
  const newerVersion = index === 0 ? null : allReleases[index - 1];
  const olderVersion =
    index === allReleases.length - 1 ? null : allReleases[index + 1];

  const generateChangelogData = (version: string | null) => {
    if (version == null) {
      return null;
    }

    return {
      slug: `/changelog/${version}/`,
      title: version
    };
  };

  return {
    newerData: generateChangelogData(newerVersion),
    olderData: generateChangelogData(olderVersion)
  };
}
