// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Header, { type HeaderProps } from "@/components/Header";

interface PageProps extends HeaderProps {
  children: React.ReactNode;
}

export default function Page({ children, ...headerProps }: PageProps) {
  return (
    <>
      <Header {...headerProps} />
      <div className="content">{children}</div>
    </>
  );
}
