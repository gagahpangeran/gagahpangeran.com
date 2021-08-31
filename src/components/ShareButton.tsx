// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faCopy, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import classModifiers from "../utils/css";

interface Props {
  link: string;
}

const ShareButton = ({ link }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const desc = [
    "Copy the link bellow and share it anywhere.",
    "Link copied! Now you can paste and share it anywhere."
  ];

  const handleClick = () => {
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setIsCopied(true);
    inputRef.current?.blur();
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <details className={classModifiers("share-button", { copied: isCopied })}>
      <summary className="share-button__summary">Share This Post</summary>
      <div className="share-button__desc">{desc[isCopied ? 1 : 0]}</div>

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
          <FontAwesomeIcon icon={isCopied ? faClipboardCheck : faCopy} />
        </button>
      </div>
    </details>
  );
};

export default ShareButton;
