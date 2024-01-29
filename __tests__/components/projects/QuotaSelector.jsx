import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import QuotaSelector from "../../../src/components/projects/QuotaSelector";

describe("QuotaSelector", () => {
  test("placeholder", () => {
    render(<QuotaSelector />);
  });
});
