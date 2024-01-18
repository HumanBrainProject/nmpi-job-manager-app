import { describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import JobList from "../../src/components/JobList";

describe("JobList", () => {
  test("placeholder", () => {
    render(<JobList jobs={[]} collab="my-collab" />);
  });
});
