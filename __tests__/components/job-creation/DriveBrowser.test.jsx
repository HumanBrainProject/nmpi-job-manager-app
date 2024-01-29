import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import DriveBrowser from "../../../src/components/job-creation/DriveBrowser";
import { AuthContext } from "../../../src/context";

describe("DriveBrowser", () => {
  test("placeholder", () => {
    render(
      <AuthContext.Provider value={{ token: "foo" }}>
        <DriveBrowser />
      </AuthContext.Provider>
    );
  });
});
