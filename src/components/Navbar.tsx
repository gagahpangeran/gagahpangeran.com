import React from "react";
import { Link } from "gatsby";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__content__link">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar__content__link">
          <a href="https://gagahpangeran.com/">Website</a>
        </div>
      </div>
    </nav>
  );
}
