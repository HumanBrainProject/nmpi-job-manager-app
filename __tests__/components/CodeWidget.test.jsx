import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import CodeWidget from "../../src/components/job-creation/CodeWidget";

describe("CodeWidget", () => {
  test("placeholder", () => {
    const code = "this is some code\nit has multiple lines\n";
    const onChange = (value) => {
      return value;
    };
    render(<CodeWidget code={code} onChange={onChange} initialTab="editor" />);
  });
});
