import { describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ProgressIndicator from "../../src/components/ProgressIndicator";

describe("ProgressIndicator", () => {
  test("placeholder", () => {
    render(<ProgressIndicator />);
  });
});
