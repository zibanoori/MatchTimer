function TeamScore({ teamName, score, onIncrease, onDecrease }) {
  return (
    <div>
      <h2>{teamName}</h2>
      <p>{score}</p>

      <div className="mt-4 flex justify-center gap-2">
        <button type="button" onClick={onIncrease}>
          +
        </button>

        <button type="button" onClick={onDecrease}>
          -
        </button>
      </div>
    </div>
  );
}

export default TeamScore;
