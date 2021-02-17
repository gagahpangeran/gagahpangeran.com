import React, { useRef, useState } from "react";

interface Props {
  link: string;
}

const ShareButton = ({ link }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <details ref={detailsRef} className="share-button">
      <summary>Share This Post</summary>
      <div className="share-button__desc">
        Copy the link bellow and share it anywhere.
      </div>
      <div className="share-button__link">
        <input ref={inputRef} type="text" defaultValue={link} />
        <button onClick={handleClick}>Copy</button>
      </div>
      {isCopied && (
        <div className="share-button__notice">
          Link is copied! Now you can paste it anywhere.
        </div>
      )}
    </details>
  );
};

export default ShareButton;
