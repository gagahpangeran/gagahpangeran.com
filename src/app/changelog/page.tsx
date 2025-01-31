// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import Link from "next/link";
import Page from "@/templates/Page";
import { getAllReleases } from "@/utils/github";

const title = "Changelog";
const desc = "All release changelog";

const renderChangelogList = (data: string[]) => {
  if (data.length === 0) {
    return <>There is no changelog.</>;
  }

  return (
    <ul className="changelog__list">
      {data.map(slug => (
        <li key={slug} className="changelog__item">
          <Link href={`/changelog/${slug}/`} className="changelog__link">
            <h4>{slug}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default async function ChangelogPage() {
  const allReleases = await getAllReleases();

  return (
    <Page mainTitle={title} subTitle={desc}>
      <main className="changelog">{renderChangelogList(allReleases)}</main>;
    </Page>
  );
}
