import { useEffect } from "react";

function disableDevtool() {
  // Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  function ctrlShiftKey(e: KeyboardEvent, key: string): boolean {
    return e.ctrlKey && e.shiftKey && e.key === key;
  }

  document.addEventListener("keydown", (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
      e.key === "F12" ||
      ctrlShiftKey(e, "i") ||
      ctrlShiftKey(e, "j") ||
      (e.ctrlKey && e.key === "u") ||
      e.keyCode === 123 ||
      ctrlShiftKey(e, "I") ||
      ctrlShiftKey(e, "J") ||
      ctrlShiftKey(e, "C") ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
    ) {
      e.preventDefault();
    }
  });
}

function devtoolTrap(isEnabled: boolean) {
  function recursiveFunction(counter: number) {
    // The following checks and debugger calls are kept as non-arithmetic checks
    if (typeof isEnabled === "string") {
      return; // Prevent infinite loop by exiting
    }

    if (isNaN(Number(isEnabled))) {
      // Safely invoke debugger statements
      try {
        (() => true).constructor("debugger").call("action");
      } catch (e) {
        // handle error if any
      }
    } else {
      try {
        (() => false).constructor("debugger").apply("stateObject");
      } catch (e) {
        // handle error if any
      }
    }

    if (counter < 100) {
      // Prevent infinite recursion
      recursiveFunction(++counter);
    }
  }

  try {
    if (isEnabled) {
      return recursiveFunction;
    }

    recursiveFunction(0);
  } catch (error) {
    console.error(error); // Log error to avoid empty catch block
  }
}

export const usePreventDevTools = (): void => {
  useEffect(() => {
    let devtoolsWindow: Window & typeof globalThis;

    try {
      devtoolsWindow = {}.constructor("return this")();
    } catch (error) {
      devtoolsWindow = window;
    }

    const intervalId = devtoolsWindow.setInterval(
      () => devtoolTrap(true),
      4000
    );
    disableDevtool();

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
