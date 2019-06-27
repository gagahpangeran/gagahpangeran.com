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
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const ShareButtonLayout = styled.div`
  margin: 16px 0;
  padding: 16px 0;
  text-align: ${props => (props.bottom ? "center" : "left")};
  border-top: ${props => (props.bottom ? "1px solid #000" : "none")};

  button {
    background: none;
    border: none;
    margin-right: 8px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    @media screen and (max-width: 500px) {
      margin-right: 4px;
    }
  }
`;

export default function ShareButton(props) {
  return (
    <ShareButtonLayout bottom={false || props.bottom}>
      <button>
        <FacebookShareButton {...props}>
          <FacebookIcon size={36} />
        </FacebookShareButton>
      </button>

      <button>
        <TwitterShareButton {...props}>
          <TwitterIcon size={36} />
        </TwitterShareButton>
      </button>

      <button>
        <LinkedinShareButton {...props}>
          <LinkedinIcon size={36} />
        </LinkedinShareButton>
      </button>

      <button>
        <TelegramShareButton {...props}>
          <TelegramIcon size={36} />
        </TelegramShareButton>
      </button>

      <button>
        <RedditShareButton {...props}>
          <RedditIcon size={36} />
        </RedditShareButton>
      </button>

      <button>
        <WhatsappShareButton {...props}>
          <WhatsappIcon size={36} />
        </WhatsappShareButton>
      </button>

      <button>
        <LineShareButton {...props}>
          <LineIcon size={36} />
        </LineShareButton>
      </button>
    </ShareButtonLayout>
  );
}
