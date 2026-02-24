import { Window } from "happy-dom";

const win = new Window();
win.document.write("");
await win.happyDOM.waitUntilComplete();

// hydro-js needs global `window` and `document` for DOM element creation
// deno-lint-ignore no-explicit-any
(globalThis as any).window = win;
// deno-lint-ignore no-explicit-any
(globalThis as any).document = win.document;

const hydro = await import("hydro-js");

export function renderToString(el: Element): string {
  return el.outerHTML;
}

export { hydro };
