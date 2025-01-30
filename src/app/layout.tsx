// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | GPR",
    default: "GPR"
  },
  description: "Low Budget Programmer"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Navbar />
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
