import Square from "./Square";
import "../styles/Board.css";

function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={winningLine?.includes(index)}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
