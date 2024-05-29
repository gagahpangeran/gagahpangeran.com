// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import Navbar from "./Navbar";
import Header, { HeaderProps } from "./Header";
import Footer from "./Footer";

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
