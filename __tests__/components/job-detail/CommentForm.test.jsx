import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import CommentForm from "../../../src/components/job-detail/CommentForm";

describe("CommentForm", () => {
  test("placeholder", () => {
    render(<CommentForm />);
  });
});
