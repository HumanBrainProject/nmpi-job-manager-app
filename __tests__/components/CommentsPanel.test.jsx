import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import CommentsPanel from "../../src/components/job-detail/CommentsPanel";

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
