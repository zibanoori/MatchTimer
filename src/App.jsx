import { useState, useEffect, useRef } from "react";
import TeamScore from "./components/TeamScore";
import "./App.css";

function App() {
  const eventInputRef = useRef(null);
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events") ?? "[]");
  });
  const [seconds, setSeconds] = useState(() => {
    return Number(localStorage.getItem("seconds") ?? 0);
  });

  const [isRunning, setIsRunning] = useState(false);

  const [iranScore, setIranScore] = useState(() => {
    return Number(localStorage.getItem("iranScore") ?? 0);
  });

  const [brazilScore, setBrazilScore] = useState(() => {
    return Number(localStorage.getItem("brazilScore") ?? 0);
  });

  const handleFocus = () => {
    eventInputRef.current.focus();
  };

  const handleAddEvent = () => {
    const eventText = eventInputRef.current.value.trim();

    if (!eventText) return;

    setEvents((prev) => [...prev, eventText]);
    eventInputRef.current.value = "";
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;

  const teams = [
    {
      id: 1,
      name: "IRAN",
      flag: "https://flagcdn.com/w80/ir.png",
      score: iranScore,
      onIncrease: () => setIranScore((prev) => prev + 1),
      onDecrease: () => setIranScore((prev) => Math.max(0, prev - 1)),
    },
    {
      id: 2,
      name: "BRAZIL",
      flag: "https://flagcdn.com/w80/br.png",
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

  useEffect(() => {
    localStorage.setItem("iranScore", String(iranScore));
    localStorage.setItem("brazilScore", String(brazilScore));
  }, [iranScore, brazilScore]);

  useEffect(() => {
    localStorage.setItem("seconds", String(seconds));
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleReset = () => {
    setIranScore(0);
    setBrazilScore(0);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">
        <div className="mb-4 flex gap-2">
          <input
            ref={eventInputRef}
            type="text"
            placeholder="Write a match event..."
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />

          <button
            type="button"
            onClick={handleFocus}
            className="rounded-xl bg-slate-700 px-4 py-3 font-semibold text-white hover:bg-slate-600"
          >
            Focus
          </button>

          <button
            type="button"
            onClick={handleAddEvent}
            className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white hover:bg-emerald-600"
          >
            Add Event
          </button>
        </div>

        <div className="mb-6 space-y-2">
          {events.map((event, index) => (
            <p key={index} className="rounded-lg bg-slate-800 p-3 text-sm">
              {event}
            </p>
          ))}
        </div>

        <header className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
            Live Match
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">MatchTimer</h1>

          <p className="mt-3 text-sm text-slate-400">International Friendly</p>
        </header>

        <div className="grid grid-cols-3 items-center gap-3">
          {teams.map((team) => (
            <TeamScore
              key={team.id}
              teamName={team.name}
              flag={team.flag}
              score={team.score}
              onIncrease={team.onIncrease}
              onDecrease={team.onDecrease}
            />
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
