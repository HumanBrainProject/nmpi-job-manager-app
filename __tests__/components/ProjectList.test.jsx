import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import ProjectList from "../../src/components/ProjectList";

describe("ProjectList", () => {
  test("placeholder", () => {
    render(<ProjectList projects={[]} />);
  });
});
