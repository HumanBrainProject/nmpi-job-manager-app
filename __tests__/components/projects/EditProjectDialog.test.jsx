import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import EditProjectDialog from "../../../src/components/projects/EditProjectDialog";

describe("EditProjectDialog", () => {
  test("placeholder", () => {
    render(<EditProjectDialog />);
  });
});
