import { describe, expect, test, vi } from "vitest";
import { render, screen, getByRole, fireEvent, waitFor } from "@testing-library/react";

import LogPanel from "../../src/components/LogPanel";
import { getLog } from "../../src/datastore";

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("finished");
    }, time);
  });
}

describe("LogPanel", () => {
  test("should not show the content at the start", () => {
    render(<LogPanel jobId="99999" />);

    const logPanel = screen.getByTitle("log panel");
    const clickableArea = getByRole(logPanel, "button");
    const ariaLabel = clickableArea.getAttribute("aria-expanded");
    expect(logPanel).toBeDefined();
    expect(clickableArea).toBeDefined();
    expect(ariaLabel).toEqual("false");
  });

  test("should show the content on click", async () => {
    vi.mock("../../src/datastore.js", () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve("This is the first line of the log.\nThis is the second line.");
        }, 100);
      });
      return {
        // getLog: () => {
        //   return promise;
        // },
        getLog: vi.fn().mockReturnValue(promise),
      };
    });

    render(<LogPanel jobId="99999" />);

    const logPanel = screen.getByTitle("log panel");
    const clickableArea = getByRole(logPanel, "button");
    fireEvent.click(clickableArea);

    await waitFor(() => expect(getLog).toHaveBeenCalledTimes(1));
    await waitFor(() => wait(200));
    expect(
      getByRole(screen.getByTitle("log panel"), "button").getAttribute("aria-expanded")
    ).toEqual("true");
  });
});
