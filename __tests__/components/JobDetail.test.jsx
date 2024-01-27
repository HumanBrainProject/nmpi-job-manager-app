import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import JobDetailRoute from "../../src/routes/job-detail";

describe("JobDetail", () => {
  test("placeholder", () => {
    const job = {
      id: 1234,
      status: "finished",
      timestamp_submission: "20230101T01:02:03Z",
      user_id: "some_user",
      hardware_platform: "BrainScaleS-47",
      timestamp_completion: "20240202T02:03:04",
      output_data: {
        repository: "some data repository",
        files: [],
      },
      code: "this is some code\nit has two lines\n",
      command: "python run.py {system}",
      hardware_config: {
        key1: "value1",
        key2: "value2",
      },
      provenance: {
        key3: "value3",
        key4: "value4",
      },
    };

    const router = createMemoryRouter(
      [{ path: "/:collabId/jobs/:jobId", element: <JobDetailRoute />, loader: () => job }],
      { initialEntries: ["/my-collab/jobs/1234"] }
    );

    render(<RouterProvider router={router} />);
  });
});
