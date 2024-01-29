import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import CollabList from "../../../src/components/home/CollabList";

describe("CollabList", () => {
  test("placeholder", () => {
    render(<CollabList collabs={[]} />);
  });
});
