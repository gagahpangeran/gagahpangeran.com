import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
