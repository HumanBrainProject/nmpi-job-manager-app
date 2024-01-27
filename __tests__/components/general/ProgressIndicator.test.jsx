import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import ProgressIndicator from "../../../src/components/general/ProgressIndicator";

describe("ProgressIndicator", () => {
  test("placeholder", () => {
    render(<ProgressIndicator />);
  });
});
