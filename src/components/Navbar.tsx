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
