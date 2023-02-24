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

const Header = () => {
  return <h1 className="header">Tic-tac-toe</h1>;
};

const WinLine = () => {
  const StraightWinLine = (
    <svg className="win-line win-line__straight" viewBox="0 0 128 128">
      <path d="M0,64L128,64"></path>
    </svg>
  );
  const DiagonalWinLine = (
    <svg className="win-line" viewBox="0 0 128 128">
      <path></path>
    </svg>
  );

  return <>{StraightWinLine}</>;
};

const GameField = () => {
  return <div className="game-board__game-field">{O}</div>;
};

const GameBoard = () => {
  return (
    <>
      <div className="game-board">
        <GameField />
        <GameField />
        <GameField />
        <GameField />
        <GameField />
        <GameField />
        <GameField />
        <GameField />
        <GameField />
      </div>
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
