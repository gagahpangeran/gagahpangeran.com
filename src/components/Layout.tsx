import React from "react";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
      <footer>
        <h6>
          &copy; {new Date().getFullYear()} -{" "}
          <a href="https://gagahpangeran.com">GPR</a> -{" "}
          <span
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
              });
            }}
          >
            Go To Top
          </span>
        </h6>
      </footer>
    </>
  );
};

export default Layout;
