import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import BrainScaleSConfig from "../../../src/components/job-creation/BrainScaleSConfig";

describe("BrainScaleSConfig", () => {
  test("placeholder", () => {
    render(<BrainScaleSConfig config={{}} />);
  });
});
