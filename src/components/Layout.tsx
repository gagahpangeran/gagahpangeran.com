// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { Link } from "gatsby";
import React from "react";
import Navbar from "./Navbar";

interface Props extends HeaderProps {
  children: React.ReactNode;
}

const Layout = ({ children, ...headerProps }: Props) => {
  faConfig.autoAddCss = false;

  return (
    <div className="wrapper">
      <Navbar />
      <Header {...headerProps} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

interface HeaderProps {
  mainTitle?: string;
  subTitle?: string;
}

const Header = ({ mainTitle, subTitle }: HeaderProps) => {
  if (mainTitle === undefined) {
    return null;
  }

  return (
    <header>
      <h1>{mainTitle}</h1>
      {subTitle && <h2>{subTitle}</h2>}
    </header>
  );
};

const Footer = () => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer>
      <h6>
        &copy; 2019-{new Date().getFullYear()} GPR •{" "}
        <Link to="/changelog/">Changelog</Link> •{" "}
        <span onClick={goToTop}>Go To Top</span>
      </h6>
    </footer>
  );
};
