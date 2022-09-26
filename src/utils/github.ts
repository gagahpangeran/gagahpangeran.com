// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

function getConstant() {
  const BASE_URL = `https://api.github.com`;
  const USER = process.env.GITHUB_USERNAME;
  const REPO = process.env.GITHUB_REPO;

  if (USER == null) {
    throw Error("Github username not found");
  }

  if (REPO == null) {
    throw Error("Github repository not found");
  }

  return { BASE_URL, USER, REPO };
}

type ReleaseData = [{ name: string }] | undefined;

export async function getAllReleases() {
  const { BASE_URL, USER, REPO } = getConstant();

  try {
    const endpoint = `${BASE_URL}/repos/${USER}/${REPO}/releases`;
    const response = await fetch(endpoint);

    const data: ReleaseData = await response.json();
    const allReleases = data?.map(({ name }) => name) ?? [];

    return allReleases;
  } catch (error) {
    throw Error("Failed to fetch all github releases");
  }
}
