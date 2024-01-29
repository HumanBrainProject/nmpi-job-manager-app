import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import Preview from "../../../src/components/job-detail/Preview";

describe("Preview", () => {
  test("placeholder", () => {
    render(<Preview />);
  });
});
