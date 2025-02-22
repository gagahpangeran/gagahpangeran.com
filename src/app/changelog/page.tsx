// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import Link from "next/link";
import Page from "@/templates/Page";
import { getAllReleases } from "@/utils/changelog";

export const revalidate = 0;

const title = "Changelog";
const desc = "All release changelog";

export default async function ChangelogPage() {
  const allReleases = await getAllReleases();

  return (
    <Page mainTitle={title} subTitle={desc}>
      <main className="changelog">
        {allReleases.length === 0 ? (
          <h3>There is no changelog.</h3>
        ) : (
          <ul className="changelog__list">
            {allReleases.map(slug => (
              <li key={slug} className="changelog__item">
                <Link href={`/changelog/${slug}/`} className="changelog__link">
                  <h4>{slug}</h4>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Page>
  );
}
