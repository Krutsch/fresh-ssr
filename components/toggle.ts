import type {
  html as htmlHydro,
  reactive as reactiveHydro,
  ternary as ternaryHydro,
} from "hydro-js";

export function createToggle(
  html: typeof htmlHydro,
  reactive: typeof reactiveHydro,
  ternary: typeof ternaryHydro,
) {
  const on = reactive(false);
  const label = ternary(
    on,
    () => "🌙 Dark",
    () => "☀️ Light",
  );

  return html`
    <div
      style="border: 1px solid #ccc; padding: 1rem; border-radius: 0.5rem; display: inline-block;"
    >
      <h2 style="margin: 0 0 0.5rem 0;">Hydro-JS Toggle</h2>
      <button
        style="padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer;"
        onclick=${() => on((val: boolean) => !val)}
      >
        ${label}
      </button>
    </div>
  ` as Element;
}
