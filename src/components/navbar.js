import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "../images/nav-logo.png";

const Nav = styled.nav`
  height: 64px;
`;

const NavContent = styled.div`
  max-width: 720px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const NavLogo = styled.div`
  width: 50%;
`;

const NavLink = styled.div`
  width: 50%;
  text-align: right;

  a {
    font-weight: bold;
    font-size: 20px;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavContent>
        <NavLogo>
          <Link to="/">
            <img src={Logo} alt="nav logo" />
          </Link>
        </NavLogo>
        <NavLink>
          <a href="https://gagahpangeran.com/">ABOUT</a>
        </NavLink>
      </NavContent>
    </Nav>
  );
}
