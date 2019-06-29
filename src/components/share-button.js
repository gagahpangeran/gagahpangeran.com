import React from "react";
import styled from "@emotion/styled";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const ShareButtonLayout = styled.div`
  margin: 16px 0;
  text-align: ${props => (props.bottom ? "center" : "left")};
  border-top: ${props => (props.bottom ? "1px solid #000" : "none")};

  button {
    background: none;
    border: none;
    margin-right: 8px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  }
`;

export default function ShareButton(props) {
  return (
    <ShareButtonLayout bottom={false || props.bottom}>
      <button>
        <FacebookShareButton {...props}>
          <FacebookIcon size={props.size} />
        </FacebookShareButton>
      </button>

      <button>
        <TwitterShareButton {...props}>
          <TwitterIcon size={props.size} />
        </TwitterShareButton>
      </button>

      <button>
        <LinkedinShareButton {...props}>
          <LinkedinIcon size={props.size} />
        </LinkedinShareButton>
      </button>

      <button>
        <TelegramShareButton {...props}>
          <TelegramIcon size={props.size} />
        </TelegramShareButton>
      </button>

      <button>
        <RedditShareButton {...props}>
          <RedditIcon size={props.size} />
        </RedditShareButton>
      </button>
    </ShareButtonLayout>
  );
}
