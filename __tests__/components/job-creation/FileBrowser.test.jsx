import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import FileBrowser from "../../../src/components/job-creation/FileBrowser";

describe("FileBrowser", () => {
  test("placeholder", () => {
    render(<FileBrowser contents={[]} path="/path/to/directory" />);
  });
});
