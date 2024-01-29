import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import Introduction from "../../../src/components/home/Introduction";

describe("Introduction", () => {
  test("placeholder", () => {
    render(<Introduction />);
  });
});
