import type { html as htmlHydro, reactive as reactiveHydro } from "hydro-js";

export function createCounter(
  html: typeof htmlHydro,
  reactive: typeof reactiveHydro,
) {
  const count = reactive(0);

  return html`
    <div
      style="border: 1px solid #ccc; padding: 1rem; border-radius: 0.5rem; display: inline-block;"
    >
      <h2 style="margin: 0 0 0.5rem 0;">Hydro-JS Counter</h2>
      <button
        style="padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer;"
        onclick=${() => count((val: number) => val + 1)}
      >
        count is ${count}
      </button>
    </div>
  ` as Element;
}
