import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Logo from "../images/nav-logo.png";

const Nav = styled.nav`
  background: #ffffff;
  height: 64px;
  width: 100%;
  position: fixed;
  top: ${props => (props.isShow ? "0" : "-64px")};
  left: 0;
  z-index: 9999999;
  transition: 0.2s ease-in-out;
  box-shadow: ${props =>
    props.isShow && !props.isTop ? "0 0 3px 3px rgba(0, 0, 0, 0.1)" : "none"};

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

  @media screen and (max-width: 500px) {
    padding: 0 8px;
  }
`;

const NavLogo = styled.div`
  img {
    filter: grayscale(100%);
    transition: filter 0.2s ease-in-out;
    height: 40px;

    @media screen and (max-width: 500px) {
      height: 32px;
    }
  }

  a {
    display: block;

    &:hover,
    &:active {
      img {
        filter: none;
      }
    }
  }
`;

const NavLink = styled.div`
  width: 50%;
  display: flex;
  margin-left: 8px;

  svg {
    height: 24px;
    fill: #aaa;
    transition: fill 0.2s ease-in-out;

    @media screen and (max-width: 500px) {
      height: 20px;
    }
  }

  a {
    display: block;
    font-weight: bold;
    font-size: 24px;
    color: #aaa;
    margin: 0 12px;

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
            <UserIcon />
          </a>
          <a href="https://github.com/gagahpangeran">
            <GithubIcon />
          </a>
        </NavLink>
      </NavContent>
    </Nav>
  );
}

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21pt"
      height="24pt"
      viewBox="0 0 21 24"
      version="1.1"
    >
      <g id="surface1">
        <path d="M 10.5 12 C 13.8125 12 16.5 9.3125 16.5 6 C 16.5 2.6875 13.8125 0 10.5 0 C 7.1875 0 4.5 2.6875 4.5 6 C 4.5 9.3125 7.1875 12 10.5 12 Z M 14.699219 13.5 L 13.917969 13.5 C 12.875 13.976562 11.71875 14.25 10.5 14.25 C 9.28125 14.25 8.128906 13.976562 7.082031 13.5 L 6.300781 13.5 C 2.820312 13.5 0 16.320312 0 19.800781 L 0 21.75 C 0 22.992188 1.007812 24 2.25 24 L 18.75 24 C 19.992188 24 21 22.992188 21 21.75 L 21 19.800781 C 21 16.320312 18.179688 13.5 14.699219 13.5 Z M 14.699219 13.5 " />
      </g>
    </svg>
  );
};

const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23pt"
      height="23pt"
      viewBox="0 0 23 23"
      version="1.1"
    >
      <g id="surface1">
        <path d="M 7.691406 17.851562 C 7.691406 17.941406 7.585938 18.015625 7.453125 18.015625 C 7.296875 18.027344 7.191406 17.957031 7.191406 17.851562 C 7.191406 17.761719 7.296875 17.691406 7.433594 17.691406 C 7.574219 17.675781 7.691406 17.75 7.691406 17.851562 Z M 6.25 17.648438 C 6.21875 17.738281 6.3125 17.84375 6.449219 17.871094 C 6.570312 17.914062 6.710938 17.871094 6.738281 17.78125 C 6.765625 17.691406 6.675781 17.585938 6.539062 17.546875 C 6.417969 17.515625 6.285156 17.558594 6.25 17.648438 Z M 8.300781 17.574219 C 8.164062 17.605469 8.074219 17.691406 8.085938 17.792969 C 8.101562 17.882812 8.222656 17.941406 8.359375 17.910156 C 8.496094 17.878906 8.589844 17.792969 8.574219 17.703125 C 8.558594 17.617188 8.433594 17.558594 8.300781 17.574219 Z M 11.351562 0.359375 C 4.921875 0.359375 0 5.089844 0 11.320312 C 0 16.300781 3.238281 20.566406 7.859375 22.066406 C 8.453125 22.167969 8.660156 21.8125 8.660156 21.523438 C 8.660156 21.242188 8.648438 19.707031 8.648438 18.765625 C 8.648438 18.765625 5.402344 19.4375 4.71875 17.425781 C 4.71875 17.425781 4.191406 16.117188 3.429688 15.78125 C 3.429688 15.78125 2.371094 15.074219 3.503906 15.089844 C 3.503906 15.089844 4.660156 15.179688 5.296875 16.25 C 6.3125 17.980469 8.011719 17.484375 8.675781 17.1875 C 8.78125 16.46875 9.085938 15.96875 9.417969 15.671875 C 6.824219 15.394531 4.210938 15.03125 4.210938 10.710938 C 4.210938 9.472656 4.5625 8.855469 5.304688 8.0625 C 5.183594 7.769531 4.789062 6.566406 5.425781 5.011719 C 6.394531 4.722656 8.625 6.226562 8.625 6.226562 C 9.550781 5.972656 10.550781 5.84375 11.535156 5.84375 C 12.523438 5.84375 13.523438 5.972656 14.449219 6.226562 C 14.449219 6.226562 16.679688 4.714844 17.648438 5.011719 C 18.285156 6.570312 17.890625 7.769531 17.769531 8.0625 C 18.511719 8.859375 18.964844 9.476562 18.964844 10.710938 C 18.964844 15.042969 16.234375 15.390625 13.640625 15.671875 C 14.070312 16.027344 14.429688 16.703125 14.429688 17.757812 C 14.429688 19.269531 14.417969 21.144531 14.417969 21.511719 C 14.417969 21.804688 14.628906 22.160156 15.21875 22.054688 C 19.855469 20.566406 23 16.300781 23 11.320312 C 23 5.089844 17.785156 0.359375 11.351562 0.359375 Z M 4.507812 15.851562 C 4.445312 15.898438 4.460938 16 4.539062 16.085938 C 4.613281 16.160156 4.71875 16.191406 4.78125 16.132812 C 4.839844 16.085938 4.828125 15.984375 4.75 15.898438 C 4.675781 15.824219 4.566406 15.792969 4.507812 15.851562 Z M 4.007812 15.488281 C 3.972656 15.546875 4.019531 15.621094 4.113281 15.664062 C 4.1875 15.710938 4.28125 15.695312 4.3125 15.632812 C 4.34375 15.574219 4.296875 15.503906 4.207031 15.457031 C 4.113281 15.429688 4.039062 15.445312 4.007812 15.488281 Z M 5.507812 17.089844 C 5.433594 17.148438 5.460938 17.28125 5.570312 17.367188 C 5.675781 17.46875 5.808594 17.484375 5.871094 17.410156 C 5.929688 17.351562 5.902344 17.21875 5.808594 17.132812 C 5.707031 17.03125 5.570312 17.015625 5.507812 17.089844 Z M 4.980469 16.429688 C 4.90625 16.472656 4.90625 16.589844 4.980469 16.691406 C 5.054688 16.796875 5.179688 16.839844 5.238281 16.796875 C 5.3125 16.738281 5.3125 16.621094 5.238281 16.519531 C 5.175781 16.414062 5.054688 16.371094 4.980469 16.429688 Z M 4.980469 16.429688 " />
      </g>
    </svg>
  );
};
