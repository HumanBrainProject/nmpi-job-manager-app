import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import JobDetail from "../../src/components/JobDetail";

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
    // Because JobDetail contains a RouterLink we need
    // to wrap it in a Router
    render(
      <BrowserRouter>
        <JobDetail job={job} collab="my-collab" />
      </BrowserRouter>
    );
  });
});
