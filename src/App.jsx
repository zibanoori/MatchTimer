import { useState } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">
        <header className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
            Live Match
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">MatchTimer</h1>
          <p className="mt-3 text-sm text-slate-400">International Friendly</p>
        </header>

        <div className="grid grid-cols-3 items-center gap-3">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl">IR</div>
            <h2 className="mt-4 text-lg font-semibold sm:text-xl">IRAN</h2>
            <p className="mt-1 text-xs text-slate-400 ">HOME</p>
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Score
            </p>
            <div className="mt-2 text-4xl font-bold tabular-nums sm:text-5xl">
              0 : 0
            </div>
          </div>

          <div className="text-center">
            <div className="text-5xl sm:text-6xl">BR</div>
            <h2 className="mt-4 text-lg font-semibold sm:text-xl">BRAZIL</h2>
            <p className="mt-1 text-xs text-slate-400">AWAY</p>
          </div>
        </div>

        <div className="my-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest sm:text-base">
            Match Time
          </p>
          <p className="mt-3 font-mono text-5xl font-bold tabular-nums sm:text-6xl">
            {seconds}
          </p>
          <p className="mt-3 text-xs text-slate-500">FIRST HALF</p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="rounded-xl bg-emerald-500 px-7 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>

        <footer className="mt-8 border-t border-slate-800 pt-5 text-center text-slate-500">
          Built with React & Tailwind CSS
        </footer>
      </section>
    </main>
  );
}

export default App;
