function Square({ value, onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          width: "60px",
          height: "60px",
          fontSize: "2rem",
          cursor: "pointer",
          backgroundColor: "#f8fafc",
          color: "#020617",
          border: "2px solid #334155"
        }}
      >
        {value}
      </button>
    );
  }
  
  export default Square;
  