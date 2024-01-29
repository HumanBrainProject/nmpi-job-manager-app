import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import ErrorInDataLoading from "../../../src/components/general/ErrorInDataLoading";

describe("ErrorInDataLoading", () => {
  test("placeholder", () => {
    render(<ErrorInDataLoading />);
  });
});
