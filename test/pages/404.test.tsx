import { render } from "@testing-library/react";
import React from "react";
import NotFoundPage from "../../src/pages/404";

describe("Test 404 Page", () => {
  it("Should render as expected", () => {
    const { getByText } = render(<NotFoundPage />);

    getByText("Sorry, not found 😢");
    getByText("The page doesn't exist (or maybe I haven't build it yet 😜)");
    getByText("Back to home");
  });
});
