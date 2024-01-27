import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import KeyValueTable from "../../src/components/KeyValueTable";

describe("KeyValueTable", () => {
  test("placeholder", () => {
    render(<KeyValueTable data={{}} bodyKeys={true} />);
  });
});
