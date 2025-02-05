// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { render } from "@testing-library/react";
import HomePage from "@/app/home/page";

describe("Test Home Page", () => {
  it("Should render as expected", () => {
    const { getByText } = render(<HomePage />);

    getByText("Gagah Pangeran Rosfatiputra");
    getByText("Low Budget Programmer");
    getByText("gpr@gagahpangeran.com");
  });
});
