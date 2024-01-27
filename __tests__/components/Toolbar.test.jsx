// import { describe, expect, test, vi } from "vitest";
// import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Toolbar from "../../src/components/Toolbar";

describe("Toolbar", () => {
  test("placeholder", () => {
    // Because Toolbar contains a RouterLink we need
    // to wrap it in a Router
    render(
      <BrowserRouter>
        <Toolbar page="jobs" collab="my-collab" />
      </BrowserRouter>
    );
  });
});
