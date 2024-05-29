// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { Link } from "gatsby";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <h6>
        &copy; 2019-{new Date().getFullYear()} GPR •{" "}
        <Link to="/changelog/">Changelog</Link> •{" "}
        <Link to="#top">Go To Top</Link>
      </h6>
    </footer>
  );
}
