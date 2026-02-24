import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import HydroIsland from "../islands/HydroIsland.tsx";
import { hydro, renderToString } from "../utils/hydro-ssr.ts";
import { createCounter } from "../components/counter.ts";
import { createToggle } from "../components/toggle.ts";

const counterHtml = renderToString(createCounter(hydro.html, hydro.reactive));
const toggleHtml = renderToString(
  createToggle(hydro.html, hydro.reactive, hydro.ternary),
);

export default define.page(function Home(ctx) {
  const count = useSignal(3);

  console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Fresh counter</title>
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Hydro-JS inside Fresh Islands</h2>
          <div class="flex gap-4">
            <HydroIsland component="counter" ssrHtml={counterHtml} />
            <HydroIsland component="toggle" ssrHtml={toggleHtml} />
          </div>
        </div>
      </div>
    </div>
  );
});
