import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import JobListRoute from "../../src/routes/jobs";

describe("JobList", () => {
  test("placeholder", () => {
    const router = createMemoryRouter(
      [{ path: "/:collabId/jobs/", element: <JobListRoute />, loader: () => [] }],
      { initialEntries: ["/my-collab/jobs/"] }
    );

    render(<RouterProvider router={router} />);
  });
});
