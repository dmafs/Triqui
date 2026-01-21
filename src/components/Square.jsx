function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "win" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
