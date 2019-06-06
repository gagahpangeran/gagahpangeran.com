import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "../images/nav-logo.png";

const Nav = styled.nav`
  background: #ffffff;
  height: 64px;
  width: 100%;
  position: fixed;
  top: ${props => (props.isShow ? "0" : "-64px")};
  left: 0;
  transition: 0.2s ease-in-out;
  box-shadow: ${props =>
    props.isShow && !props.isTop ? "0 0 3px 3px rgba(0, 0, 0, 0.1)" : "none"};
`;

const NavContent = styled.div`
  max-width: 720px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const NavLogo = styled.div`
  img {
    filter: grayscale(100%);
    transition: filter 0.2s ease-in-out;

    &:hover {
      filter: none;
    }
  }
`;

const NavLink = styled.div`
  width: 50%;
  display: flex;
  margin-left: 8px;

  a {
    display: block;
    font-weight: bold;
    font-size: 24px;
    color: #aaa;
    margin: 0 12px;
  }
`;

export default function Navbar() {
  const [isShow, setShow] = useState(true);
  const [isTop, setTop] = useState(true);

  useEffect(() => {
    let prevPosition = window.pageYOffset || document.documentElement.scrollTop;

    const handler = () => {
      let currentPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      setShow(prevPosition > currentPosition);
      setTop(window.scrollY === 0);

      prevPosition = currentPosition;
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <Nav isShow={isShow} isTop={isTop}>
      <NavContent>
        <NavLogo>
          <Link to="/">
            <img src={Logo} alt="nav logo" />
          </Link>
        </NavLogo>
        <NavLink>
          <a href="https://gagahpangeran.com/">
            <i class="fas fa-user" />
          </a>
          <a href="https://github.com/gagahpangeran">
            <i class="fab fa-github" />
          </a>
        </NavLink>
      </NavContent>
    </Nav>
  );
}
