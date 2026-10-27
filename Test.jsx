import { useState } from "react";

const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

const getWinner = (board) => {
    for (const [a, b, c] of LINES) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const cellStyle = {
    width: 80,
    height: 80,
    fontSize: 36,
    cursor: "pointer",
    color: 'green' // !important is not valid in inline styles
};

const Fun = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = getWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const handleClick = (i) => {
        console.log("Clicked cell: ", i);
        if (board[i] || winner) return;
        const next = [...board];
        next[i] = xIsNext ? "X" : "O";
        setBoard(next);
        setXIsNext(!xIsNext);
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    let status = `Next player: ${xIsNext ? "X" : "O"}`;
    if (winner) status = `Winner: ${winner}`;
    else if (isDraw) status = "Draw!";

    return (
        <div>
            <h2>Tic Tac Toe</h2>
            <p>{status}</p>
            <div style={{ display: "grid", backgroundColor: 'magenta', gridTemplateColumns: "repeat(3, 80px)", color:'gray', gap: 4 }}>
                {board.map((value, i) => (
                    <button key={i} style={cellStyle} onClick={() => handleClick(i)}>
                        {value}
                    </button>
                ))}
            </div>
            <button onClick={reset} style={{ marginTop: 12 }}>Restart</button>
        </div>
    );
};

export default Fun;
