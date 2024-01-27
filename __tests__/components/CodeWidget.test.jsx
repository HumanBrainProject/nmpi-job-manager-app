import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import CodeWidget from "../../src/components/CodeWidget";

describe("CodeWidget", () => {
  test("placeholder", () => {
    const code = "this is some code\nit has multiple lines\n";
    const onChange = (value) => {
      return value;
    };
    render(<CodeWidget code={code} onChange={onChange} initialTab="editor" />);
  });
});
