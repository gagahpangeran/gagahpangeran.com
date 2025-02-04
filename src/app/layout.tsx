// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { Lato, Rubik, Fira_Code } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { classAll } from "@/utils/css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import "@/styles/index.scss";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s | GPR",
    default: "GPR"
  },
  description: "Low Budget Programmer"
};

const latoFont = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato"
});

const rubikFont = Rubik({
  subsets: ["latin"],
  weight: ["300", "500", "800"],
  variable: "--font-rubik"
});

const firaCodeFont = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classAll([
          latoFont.variable,
          rubikFont.variable,
          firaCodeFont.variable
        ])}
      >
        <div className="wrapper">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
