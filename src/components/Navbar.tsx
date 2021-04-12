// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__content">
        <li className="navbar__content__link">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__content__link">
          <a href="https://gagahpangeran.com/">Website</a>
        </li>
      </ul>
    </nav>
  );
}
