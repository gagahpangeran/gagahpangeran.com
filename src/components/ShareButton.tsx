import React from "react";
import styled from "../utils/styled";
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
  text-align: left;

  button {
    background: none;
    border: none;
    margin-right: 8px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  }
`;

interface Props {
  url: string;
  title: string;
  via: string;
  quote: string;
  hashtags: string[];
  size: number;
}

export default function ShareButton(props: Props) {
  return (
    <ShareButtonLayout>
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
