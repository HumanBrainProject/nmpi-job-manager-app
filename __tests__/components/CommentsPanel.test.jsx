import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import CommentsPanel from "../../src/components/CommentsPanel";

describe("CommentsPanel", () => {
  test("placeholder", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/:collabId/jobs/:jobId",
          element: <CommentsPanel jobId="99999" />,
        },
      ],
      { initialEntries: ["/my-collab/jobs/99999"] }
    );

    render(<RouterProvider router={router} />);
  });
});
