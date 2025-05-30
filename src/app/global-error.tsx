// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

"use client";

import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={500} />
      </body>
    </html>
  );
}
