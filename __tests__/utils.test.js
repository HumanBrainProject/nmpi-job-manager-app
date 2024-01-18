import { expect, test } from "vitest";
import { timeFormat } from "../src/utils";

test("formats datetime string as expected", () => {
  expect(timeFormat("2023-11-17T10:36:35.080614+00:00")).toBe(
    "2023/11/17 10:36:35"
  );
});
