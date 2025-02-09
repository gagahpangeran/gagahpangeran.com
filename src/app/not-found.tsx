// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Link from "next/link";
import Page from "@/templates/Page";
import { notFoundMetadata } from "@/utils/metadata";

export const metadata: Metadata = notFoundMetadata;

export default function NotFoundPage() {
  const title = "Sorry, not found 😢";
  const desc = "The page doesn't exist (or maybe I haven't build it yet 😜)";

  return (
    <Page mainTitle={title}>
      <main className="not-found">
        <h3 className="not-found__desc">{desc}</h3>
        <Link className="not-found__link" href="/home/">
          Back to home
        </Link>
      </main>
    </Page>
  );
}
