import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import CodePanel from "../../../src/components/job-detail/CodePanel";

describe("CodePanel", () => {
  test("placeholder", () => {
    render(<CodePanel jobId="99999" />);
  });
});
