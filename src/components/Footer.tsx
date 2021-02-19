import React from "react";

const Footer = () => {
  return (
    <footer>
      <h6>
        &copy; 2019-{new Date().getFullYear()}{" "}
        <a href="https://gagahpangeran.com">GPR</a> •{" "}
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
  );
};

export default Footer;
