import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "../../../src/components/general/ErrorPage";

describe("ErrorPage", () => {
  test("placeholder", () => {
    const router = createMemoryRouter(
      [{ path: "/:collabId/jobs/", element: <ErrorPage />, loader: () => [] }],
      { initialEntries: ["/foo/"] }
    );

    render(<RouterProvider router={router} />);
  });
});
