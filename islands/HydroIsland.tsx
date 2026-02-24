import { useEffect, useRef } from "preact/hooks";

type ComponentName = "counter" | "toggle";

async function loadAndCreate(
  name: ComponentName,
  hydro: typeof import("hydro-js"),
) {
  const { html, reactive, ternary } = hydro;
  return (await import(`../components/${name}.ts`))[
    `create${name.charAt(0).toUpperCase() + name.slice(1)}`
  ](html, reactive, ternary);
}

export default function HydroIsland({
  component,
  ssrHtml,
}: {
  component: ComponentName;
  ssrHtml?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function hydrate() {
      const hydro = await import("hydro-js");
      if (!ref.current) return;

      const componentInstance = await loadAndCreate(component, hydro);
      ref.current.innerHTML = "";
      hydro.render(componentInstance, ref.current);
    }

    hydrate();
  }, [component]);

  return ssrHtml ? (
    // deno-lint-ignore react-no-danger
    <div ref={ref} dangerouslySetInnerHTML={{ __html: ssrHtml }} />
  ) : (
    <div ref={ref}>Loading...</div>
  );
}
