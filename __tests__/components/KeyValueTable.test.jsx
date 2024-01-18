import { describe, expect, test, vi } from "vitest";
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import KeyValueTable from "../../src/components/KeyValueTable";

describe("KeyValueTable", () => {
  test("placeholder", () => {
    render(<KeyValueTable data={{}} bodyKeys={true} />);
  });
});
