import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import TagDisplay from "../../../src/components/general/TagDisplay";

describe("TagDisplay", () => {
  test("placeholder", () => {
    render(<TagDisplay />);
  });
});
