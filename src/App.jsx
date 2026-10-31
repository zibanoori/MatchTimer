import { useState, useEffect } from "react";
import TeamScore from "./components/TeamScore";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [iranScore, setIranScore] = useState(() => {
    return Number(localStorage.getItem("iranScore") ?? 0);
  });
  const [brazilScore, setBrazilScore] = useState(() => {
    return Number(localStorage.getItem("brazilScore") ?? 0);
  });

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  const teams = [
    {
      id: 1,
      name: "IRAN",
      score: iranScore,
      onIncrease: () => setIranScore((prev) => prev + 1),
      onDecrease: () => setIranScore((prev) => Math.max(0, prev - 1)),
    },
    {
      id: 2,
      name: "BRAZIL",
      score: brazilScore,
      onIncrease: () => setBrazilScore((prev) => prev + 1),
      onDecrease: () => setBrazilScore((prev) => Math.max(0, prev - 1)),
    },
  ];

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleReset = () => {
    setIranScore(0);
    setBrazilScore(0);
    setSeconds(0);
    setIsRunning(false);
  };

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
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={`text-center ${index === 1 ? "col-start-3" : "col-start-1"}`}
            >
              <TeamScore
                teamName={team.name}
                score={team.score}
                onIncrease={team.onIncrease}
                onDecrease={team.onDecrease}
              />
            </div>
          ))}

          <div className="col-start-2 row-start-1 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Score
            </p>
            <div className="mt-2 text-4xl font-bold tabular-nums sm:text-5xl">
              {iranScore} : {brazilScore}
            </div>
          </div>
        </div>

        <div className="my-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest sm:text-base">
            Match Time
          </p>

          <p className="mt-3 font-mono text-5xl font-bold tabular-nums sm:text-6xl">
            {formattedTime}
          </p>

          <p className="mt-3 text-xs text-slate-500">FIRST HALF</p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-slate-700 px-7 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setIsRunning((prev) => !prev)}
            className="rounded-xl bg-emerald-500 px-7 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            {isRunning ? "Pause" : "Start"}
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
