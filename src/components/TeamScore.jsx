function TeamScore({ teamName, flag, score, onIncrease, onDecrease }) {
  return (
    <div className="text-center">
      <div className="mb-3 flex justify-center">
        <img
          src={flag}
          alt={`${teamName} flag`}
          className="h-10 w-14 rounded object-cover shadow-md"
        />
      </div>

      <h2 className="text-lg font-bold tracking-wider">{teamName}</h2>

      <p className="mt-2 text-3xl font-bold">{score}</p>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          onClick={onIncrease}
          className="rounded-lg bg-emerald-500 px-4 py-2 font-bold hover:bg-emerald-600"
        >
          +
        </button>

        <button
          type="button"
          onClick={onDecrease}
          className="rounded-lg bg-slate-700 px-4 py-2 font-bold hover:bg-slate-600"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default TeamScore;
