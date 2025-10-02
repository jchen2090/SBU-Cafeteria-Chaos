import type { Dispatch, SetStateAction } from "react";

type StartScreenProps = {
  setGameStarted: Dispatch<SetStateAction<boolean>>;
};

export const StartScreen = ({ setGameStarted }: StartScreenProps) => {
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div
      id="start-screen"
      className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8 relative"
    >
      <div id="attract-mode-container" className="absolute inset-0 pointer-events-none overflow-hidden z-20"></div>
      <div className="bg-black/60  p-12 rounded-2xl shadow-lg relative ">
        <div
          id="top-left-stats"
          className="absolute top-4 left-4 text-white text-2xl font-bold p-3 rounded-lg text-left"
        >
          <div>
            Games Played: <span id="games-played-display">0</span>
          </div>
        </div>
        <div
          id="top-right-stats"
          className="absolute top-4 right-4 text-white text-2xl font-bold p-3 rounded-lg text-right"
        >
          <div>
            High Score: <span id="top-score-display">0</span>
          </div>
        </div>
        <h1
          id="game-name-display"
          className="font-bangers text-8xl mt-8 md:text-9xl text-yellow-400 text-shadow[4px_4px_0_0]"
        >
          SBU Eat's Cafeteria Chaos
        </h1>
        <p
          id="game-headline-display"
          className="text-2xl md:text-3xl mt-4 mb-8 min-h-[64px] flex items-center justify-center"
        >
          Tap an order, build it, and submit before it expires!
        </p>

        <div id="main-menu-controls">
          <button
            id="start-game-btn"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-4xl py-6 px-12 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-green-700 cursor-pointer"
            onClick={startGame}
          >
            Start Game
          </button>
          <div className="flex gap-4 justify-center mt-6">
            <button
              id="high-scores-btn"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-blue-700"
            >
              High Scores
            </button>
            <button
              id="special-challenge-btn"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-yellow-300"
            >
              ✨ Daily Special
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
