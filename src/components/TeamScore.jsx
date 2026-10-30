function TeamScore({ teamName, score, onIncrease, onDecrease }) {
  return (
    <div>
      <h2>{teamName}</h2>
      <p>{score}</p>
    </div>
  );
}

export default TeamScore;
