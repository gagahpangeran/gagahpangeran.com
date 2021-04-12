// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { GatsbySSR, PreRenderHTMLArgs } from "gatsby";

// This is workaround for
// https://github.com/gagahpangeran/blog.gagahpangeran.com/issues/83
// Code is copied and adapted to typescript from
// https://github.com/gatsbyjs/gatsby/issues/1526#issuecomment-639993049
export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({
  getHeadComponents
}: PreRenderHTMLArgs): any => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  getHeadComponents().forEach(elem => {
    const el = elem as ReactElement;

    if (el.type === "style" && el.props["data-href"]) {
      el.type = "link";

      el.props["href"] = el.props["data-href"];
      el.props["rel"] = "stylesheet";
      el.props["type"] = "text/css";

      delete el.props["data-href"];
      delete el.props["dangerouslySetInnerHTML"];
    }
  });
};
