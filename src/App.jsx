import { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes, FaRegCircle, FaEquals } from "react-icons/fa";

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
      return { player: squares[a], line };
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const [winsX, setWinsX] = useState(() => Number(localStorage.getItem("winsX")) || 0);
  const [winsO, setWinsO] = useState(() => Number(localStorage.getItem("winsO")) || 0);
  const [draws, setDraws] = useState(() => Number(localStorage.getItem("draws")) || 0);

  const lastResultRef = useRef(null);
  const hasProcessedRef = useRef(false);

  const result = calculateWinner(squares);
  const winner = result?.player;
  const winningLine = result?.line;

  const isDraw = squares.every(s => s !== null) && !winner;

  const gameStatus = winner
    ? "win"
    : isDraw
    ? "draw"
    : "playing";

  // Guardar en localStorage cuando cambien los contadores
  useEffect(() => {
    localStorage.setItem("winsX", winsX);
    localStorage.setItem("winsO", winsO);
    localStorage.setItem("draws", draws);
  }, [winsX, winsO, draws]);

  // Detectar fin de juego y mostrar notificaciones
  useEffect(() => {
    if (!winner && !isDraw) {
      lastResultRef.current = null;
      hasProcessedRef.current = false;
      return;
    }

    const currentResult = winner ? winner : "draw";
    
    // Evitar duplicados
    if (currentResult === lastResultRef.current || hasProcessedRef.current) return;
    
    lastResultRef.current = currentResult;
    hasProcessedRef.current = true;

    // Mostrar toast
    if (currentResult === "X") {
      toast.success("🎉 Ganó X");
    } else if (currentResult === "O") {
      toast.success("🎉 Ganó O");
    } else if (currentResult === "draw") {
      toast.info("🤝 Empate");
    }
  }, [winner, isDraw]);

  function handleSquareClick(index) {
    if (squares[index] || gameStatus !== "playing") return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    setIsXNext(!isXNext);

    // Actualizar contadores inmediatamente después del movimiento
    const result = calculateWinner(newSquares);
    const newWinner = result?.player;
    const newIsDraw = newSquares.every(s => s !== null) && !newWinner;

    if (newWinner === "X") {
      setWinsX(prev => prev + 1);
    } else if (newWinner === "O") {
      setWinsO(prev => prev + 1);
    } else if (newIsDraw) {
      setDraws(prev => prev + 1);
    }
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    lastResultRef.current = null;
    hasProcessedRef.current = false;
    toast.dismiss();
  }

  return (
    <div className="app">
      <div className="card">
        {/* CONTADOR */}
        <div className="counter">
          <span className="x"><FaTimes /> : {winsX}</span>
          <span className="o"><FaRegCircle /> : {winsO}</span>
          <span className="d"><FaEquals /> Empates: {draws}</span>
        </div>

        <h1>Triqui - React</h1>

        <p>
          {gameStatus === "win" && <strong>Ganador: {winner}</strong>}
          {gameStatus === "draw" && <strong>Empate</strong>}
          {gameStatus === "playing" && (
            <>Turno: <strong>{isXNext ? "X" : "O"}</strong></>
          )}
        </p>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <button className="btn" onClick={handleReset}>
          Reiniciar juego
        </button>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;