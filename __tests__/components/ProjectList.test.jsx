import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import ProjectListRoute from "../../src/routes/projects";

describe("ProjectList", () => {
  test("placeholder", () => {
    const router = createMemoryRouter(
      [{ path: "/:collabId/projects/", element: <ProjectListRoute />, loader: () => [] }],
      { initialEntries: ["/fake-collab/projects/"] }
    );

    render(<RouterProvider router={router} />);
  });
});
