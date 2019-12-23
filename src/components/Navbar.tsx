import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "../utils/styled";

const Nav = styled.nav`
  background: ${props => props.theme.background.light};
  height: 64px;
  width: 100%;
  position: fixed;
  top: ${props => (props.isShow ? "0" : "-64px")};
  left: 0;
  z-index: 9999999;
  transition: 0.2s ease-in-out;
  box-shadow: ${props =>
    props.isShow && !props.isTop ? "0 0 3px 3px rgba(0, 0, 0, 0.4)" : "none"};

  @media screen and (max-width: 500px) {
    height: 48px;
  }
`;

const NavContent = styled.div`
  max-width: 720px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 720px) {
    padding: 0 16px;
  }
`;

const NavLink = styled.div`
  display: flex;
  margin-right: 20px;

  a {
    display: block;
    font-weight: bold;

    @media screen and (max-width: 500px) {
      margin: 0 4px;
    }

    &:hover,
    &:active {
      svg {
        fill: #0e96da;
      }
    }
  }
`;

export default function Navbar() {
  const [isShow, setShow] = useState(true);
  const [isTop, setTop] = useState(true);

  useEffect(() => {
    let prevPosition = window.pageYOffset || document.documentElement.scrollTop;

    const handler = () => {
      const currentPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      setShow(prevPosition >= currentPosition);
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
        <NavLink>
          <Link to="/">Home</Link>
        </NavLink>
        <NavLink>
          <a href="https://gagahpangeran.com/">Website</a>
        </NavLink>
      </NavContent>
    </Nav>
  );
}
