// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  faConfig.autoAddCss = false;

  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
