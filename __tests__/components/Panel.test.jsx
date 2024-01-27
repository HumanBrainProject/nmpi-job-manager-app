import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import Panel from "../../src/components/general/Panel";

describe("Panel", () => {
  test("placeholder", () => {
    render(
      <Panel label="This is a generic accordion-based panel" icon="icon" defaultExpanded={true}>
        children
      </Panel>
    );
  });
});
