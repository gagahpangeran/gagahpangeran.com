import React from "react";

interface Props {
  link: string;
}

const ShareButton = ({ link }: Props) => {
  return (
    <details>
      <summary>Share This Post</summary>
      <div>Copy the link bellow and share it anywhere.</div>
      <input type="text" value={link} />
    </details>
  );
};

export default ShareButton;
