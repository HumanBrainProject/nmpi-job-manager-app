import { describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import CodePanel from "../../src/components/CodePanel";

describe("CodePanel", () => {
  test("placeholder", () => {
    render(<CodePanel jobId="99999" />);
  });
});
