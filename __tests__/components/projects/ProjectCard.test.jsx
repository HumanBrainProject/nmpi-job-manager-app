import { describe, test } from "vitest";
import { render } from "@testing-library/react";

import ProjectCard from "../../../src/components/projects/ProjectCard";

describe("ProjectCard", () => {
  test("placeholder", () => {
    render(<ProjectCard project={{ quotas: [] }} />);
  });
});
