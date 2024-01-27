import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusChip from "../../../src/components/general/StatusChip";

describe("Status chip test", () => {
  test("should show label on chip", () => {
    render(<StatusChip status="finished" />);

    expect(screen.getByText(/finished/i)).toBeDefined();
  });
});
