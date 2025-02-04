// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

export interface HeaderProps {
  mainTitle?: string;
  subTitle?: string;
}

export default function Header(props: HeaderProps) {
  const renderHeader = ({ mainTitle, subTitle }: HeaderProps) => {
    if (mainTitle === undefined) {
      return null;
    }

    return (
      <>
        <h1>{mainTitle}</h1>
        {subTitle && <h2>{subTitle}</h2>}
      </>
    );
  };

  return <header id="header">{renderHeader(props)}</header>;
}
