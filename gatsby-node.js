// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

/* eslint-disable @typescript-eslint/no-var-requires */
require("source-map-support").install();
require("ts-node").register({ files: true, transpileOnly: true });

module.exports = require("./gatsby-node.ts");
