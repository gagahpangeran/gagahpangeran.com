// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";

const links = ["Home", "Blog"];

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__content">
        {links.map(link => (
          <li key={link} className="navbar__item">
            <Link className="navbar__link" to={`/${link.toLowerCase()}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
