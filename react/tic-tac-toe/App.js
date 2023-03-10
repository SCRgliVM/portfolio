"use strict";

const X = (
  <svg className="X" viewBox="0 0 128 128">
    <path d="M16,16L112,112"></path>
    <path d="M112,16L16,112"></path>
  </svg>
);
const O = (
  <svg className="O" viewBox="0 0 128 128">
    <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path>
  </svg>
);

const emptyGameField = [null, null, null, null, null, null, null, null, null];
const winningVariants = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GameState = ({ winner, resetField }) => {
  let currentWinner = "";
  if (winner === "x" || winner === "o")
    currentWinner = <p>{winner.toUpperCase()} Win</p>;
  return (
    <div className="game-status">
      {currentWinner}
      <button onClick={resetField}>Restart game</button>
    </div>
  );
};

const Header = () => {
  return <h1 className="header">Tic-tac-toe</h1>;
};

const WinLine = () => {
  const StraightWinLine = (
    <svg className="win-line win-line__straight" viewBox="0 0 384 128">
      <path d="M0,64L384,64"></path>
    </svg>
  );
  const DiagonalWinLine = (
    <svg className="win-line" viewBox="0 0 128 128">
      <path></path>
    </svg>
  );

  return <>{StraightWinLine}</>;
};

const GameField = ({ changeState, fieldState }) => {
  return (
    <div
      className="game-board__game-field"
      onClick={() => !fieldState && changeState("x")}
    >
      {fieldState === null ? "" : fieldState === "x" ? X : O}
    </div>
  );
};

const GameBoard = () => {
  const [gameField, setGameField] = React.useState(emptyGameField);
  const [currentTurn, setCurrentTurn] = React.useState("player");
  const [winner, setWinner] = React.useState(null);

  const checkWin = () => {
    let winner = null;
    winningVariants.forEach((variant) => {
      if (
        (gameField[variant[0]] === "x" || gameField[variant[0]] === "o") &&
        gameField[variant[0]] === gameField[variant[1]] &&
        gameField[variant[1]] === gameField[variant[2]]
      )
        winner = gameField[variant[0]];
    });
    return winner;
  };
  
  const calculateWinner= () => {
    if (winner) return winner;
    let calculatedWinner = checkWin();
    if (calculatedWinner) setWinner(calculatedWinner);
    return calculatedWinner;  
  }

  let calculatedWinner = calculateWinner();

  const getChangeStateForField = (fieldNumber) => {
    if (calculatedWinner) return () => {};
    return (sign) => {
      let newGameField = [...gameField];
      newGameField[fieldNumber] = sign;
      setGameField(newGameField);
      setCurrentTurn("machine");
    };
  };

  const resetField = () => {
    setGameField(emptyGameField);
    setCurrentTurn("player");
    setWinner(null);
  };

  if (!calculatedWinner && currentTurn === "machine") {
    let newGameField = [...gameField];
    newGameField[gameField.indexOf(null)] = "o";
    setGameField(newGameField);
    setCurrentTurn("player");
  }
  
  return (
    <>
      <div className="game-board">
        <GameField
          changeState={getChangeStateForField(0)}
          fieldState={gameField[0]}
        />
        <GameField
          changeState={getChangeStateForField(1)}
          fieldState={gameField[1]}
        />
        <GameField
          changeState={getChangeStateForField(2)}
          fieldState={gameField[2]}
        />
        <GameField
          changeState={getChangeStateForField(3)}
          fieldState={gameField[3]}
        />
        <GameField
          changeState={getChangeStateForField(4)}
          fieldState={gameField[4]}
        />
        <GameField
          changeState={getChangeStateForField(5)}
          fieldState={gameField[5]}
        />
        <GameField
          changeState={getChangeStateForField(6)}
          fieldState={gameField[6]}
        />
        <GameField
          changeState={getChangeStateForField(7)}
          fieldState={gameField[7]}
        />
        <GameField
          changeState={getChangeStateForField(8)}
          fieldState={gameField[8]}
        />
      </div>
      <GameState winner={calculatedWinner} resetField={resetField} />
    </>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <GameBoard />
    </>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
