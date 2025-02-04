// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

"use client";

import {
  faCopy,
  faClipboardCheck,
  faShareNodes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { classModifiers } from "@/utils/css";

interface Props {
  title?: string;
}

interface NativeShareButtonProps {
  url: string;
  title?: string;
  toggleError: () => void;
}

type CopyState = "idle" | "success" | "failed";

const desc: Record<CopyState, string> = {
  idle: "Copy the link bellow and share it anywhere.",
  success: "Link copied! Now you can paste and share it anywhere.",
  failed: "Failed to copy link to clipboard. Please select and copy manually."
};

const CopyShareButton = ({ url }: { url: string }) => {
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
    <div className={classModifiers("share-button__copy", copyState)}>
      <div className="share-button__copy__desc">{desc[copyState]}</div>

      <div className="share-button__copy__link">
        <input
          className="share-button__copy__link-item share-button__copy__link-item--input"
          ref={inputRef}
          type="text"
          defaultValue={url}
        />
        <button
          className="share-button__copy__link-item share-button__copy__link-item--button"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon={copyState === "success" ? faClipboardCheck : faCopy}
          />
        </button>
      </div>
    </div>
  );
};

const NativeShareButton = ({
  url,
  title,
  toggleError
}: NativeShareButtonProps) => {
  const data: ShareData = {
    title,
    url
  };

  const handleClick = async () => {
    try {
      await navigator.share(data);
    } catch (error) {
      toggleError();
    }
  };

  return (
    <button className="share-button__native" onClick={handleClick}>
      <FontAwesomeIcon icon={faShareNodes} />
      <span className="share-button__native__text">Share This Post</span>
    </button>
  );
};

const ShareButton = ({ title }: Props) => {
  const [url, setUrl] = useState<string | undefined>();
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  });

  const toggleError = () => {
    setErrorState(true);
  };

  return (
    url && (
      <div className="share-button">
        {errorState ? (
          <CopyShareButton url={url} />
        ) : (
          <NativeShareButton
            url={url}
            title={title}
            toggleError={toggleError}
          />
        )}
      </div>
    )
  );
};

export default ShareButton;
