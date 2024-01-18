import { describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import CommentsPanel from "../../src/components/CommentsPanel";

describe("CommentsPanel", () => {
  test("placeholder", () => {
    render(<CommentsPanel jobId="99999" />);
  });
});
