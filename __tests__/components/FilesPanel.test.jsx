import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import FilesPanel from "../../src/components/FilesPanel";

describe("FilesPanel", () => {
  test("placeholder", () => {
    const mockDataset = {
      repository: "A file repository",
      files: [],
    };

    const router = createMemoryRouter(
      [
        {
          path: "/:collabId/jobs/:jobId",
          element: <FilesPanel label="Output data" dataset={mockDataset} />,
        },
      ],
      { initialEntries: ["/my-collab/jobs/1234"] }
    );

    render(<RouterProvider router={router} />);
  });
});
