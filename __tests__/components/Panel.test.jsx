import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import Panel from "../../src/components/Panel";

describe("Panel", () => {
  test("placeholder", () => {
    render(
      <Panel
        label="This is a generic accordion-based panel"
        children="children"
        icon="icon"
        defaultExpanded={true}
      />
    );
  });
});
