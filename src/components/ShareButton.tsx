// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

interface Props {
  link: string;
}

const ShareButton = ({ link }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
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
    <details ref={detailsRef} className="share-button">
      <summary>Share This Post</summary>
      <div className="share-button__desc">{desc[isCopied ? 1 : 0]}</div>
      <div className="share-button__link">
        <input ref={inputRef} type="text" defaultValue={link} />
        <button onClick={handleClick}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    </details>
  );
};

export default ShareButton;
