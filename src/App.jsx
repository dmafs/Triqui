import { useState  } from "react"; 
import Board from "./components/Board";


function calculateWinner(squares){

    const lines =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let  i = 0 ; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ){
            return squares[a];
        }
    }
    return null;
}

function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(squares);
    const isDraw = squares.every(square => square !== null) && !winner;


    function hndleSquareClick(index){
        if (squares[index] || winner)return; 

        const newSquares =[...squares]; 
        newSquares[index] = isXNext ? "X" : "O"; 

        setSquares(newSquares); 
        setIsXNext(!isXNext);

    }

  return (
    <div
      style={{
        backgroundColor: "#020617",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        color: "#e5e7eb"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Triqui - React</h1>
      <p style ={{marginBottom: "20px"}}>
      {winner && <strong>Ganador: {winner}</strong>}
      {isDraw && <strong>Empate </strong>}
      {!winner && !isDraw && (
        <>
        Turno: <strong>{isXNext ? "X" : "O"}</strong>
        </>
      )}
      </p>

      <Board
        squares={squares}
        onSquareClick={hndleSquareClick}
      />

<button
  onClick={() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }}
  style={{
    marginTop: "20px",
    padding: "8px 16px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff"
  }}
>
  Reiniciar juego
</button>

    </div>
  );    
}
export default App;
