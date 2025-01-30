// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <h6>
        &copy; 2019-{new Date().getFullYear()} GPR •{" "}
        <Link href="/changelog/">Changelog</Link> •{" "}
        <Link href="#top">Go To Top</Link>
      </h6>
    </footer>
  );
}
