import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import Comment from "../../../src/components/job-detail/Comment";

describe("Comment", () => {
  test("placeholder", () => {
    render(<Comment />);
  });
});
