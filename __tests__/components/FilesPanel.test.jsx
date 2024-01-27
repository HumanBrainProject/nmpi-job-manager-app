import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import FilesPanel from "../../src/components/FilesPanel";

describe("FilesPanel", () => {
  test("placeholder", () => {
    const mockDataset = {
      repository: "A file repository",
      files: [],
    };
    render(<FilesPanel label="Output data" dataset={mockDataset} />);
  });
});
