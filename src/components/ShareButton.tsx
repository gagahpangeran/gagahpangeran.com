// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faCopy, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import classModifiers from "../utils/css";

interface Props {
  link: string;
  title: string;
}

interface NativeShareButtonProps extends Props {
  toggleError: () => void;
}

type CopyState = "idle" | "success" | "failed";

const desc: Record<CopyState, string> = {
  idle: "Copy the link bellow and share it anywhere.",
  success: "Link copied! Now you can paste and share it anywhere.",
  failed: "Failed to copy link to clipboard. Please select and copy manually."
};

const CopyShareButton = ({ link }: Props) => {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = async () => {
    try {
      if (inputRef.current == null) {
        throw new Error("Input ref is null");
      }

      await navigator.clipboard.writeText(inputRef.current.value);

      setCopyState("success");
    } catch (error) {
      console.error(error);
      setCopyState("failed");
    }

    setTimeout(() => {
      setCopyState("idle");
    }, 1500);
  };

  return (
    <details className={classModifiers("share-button", copyState)}>
      <summary className="share-button__summary">Share This Post</summary>
      <div className="share-button__desc">{desc[copyState]}</div>

      <div className="share-button__link">
        <input
          className="share-button__link-item share-button__link-item--input"
          ref={inputRef}
          type="text"
          defaultValue={link}
        />
        <button
          className="share-button__link-item share-button__link-item--button"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon={copyState === "success" ? faClipboardCheck : faCopy}
          />
        </button>
      </div>
    </details>
  );
};

const NativeShareButton = ({
  link,
  title,
  toggleError
}: NativeShareButtonProps) => {
  const data = {
    title,
    link
  };

  const handleClick = async () => {
    try {
      await navigator.share(data);
    } catch (error) {
      toggleError();
    }
  };

  return <button onClick={handleClick}>Share</button>;
};

const ShareButton = ({ link, title }: Props) => {
  const [errorState, setErrorState] = useState(false);

  const toggleError = () => {
    setErrorState(true);
  };

  return (
    <NativeShareButton link={link} title={title} toggleError={toggleError} />
  );
};

export default ShareButton;
