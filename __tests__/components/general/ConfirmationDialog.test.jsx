import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import ConfirmationDialog from "../../../src/components/general/ConfirmationDialog";

describe("ConfirmationDialog", () => {
  test("placeholder", () => {
    render(<ConfirmationDialog />);
  });
});
