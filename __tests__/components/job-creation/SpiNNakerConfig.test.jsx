import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import SpiNNakerConfig from "../../../src/components/job-creation/SpiNNakerConfig";

describe("SpiNNakerConfig", () => {
  test("placeholder", () => {
    render(<SpiNNakerConfig config={{}} />);
  });
});
