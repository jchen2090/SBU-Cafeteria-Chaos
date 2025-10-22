import { useEffect, useState } from "react";
import { useGameContext } from "../providers/GameStateProvider";
import { saveToFile } from "../utils/Scores";

export const GameOverScreen = () => {
  const { state, dispatch } = useGameContext();
  let isNewRecord = false;

  if (state.currentScore !== 0) {
    if (state.highScores.length === 0) {
      isNewRecord = true;
    } else if (state.currentScore > state.highScores[state.highScores.length - 1]?.score) {
      isNewRecord = true;
    } else if (state.highScores.length <= state.config.MAX_RECORDS) {
      isNewRecord = true;
    }
  }

  const [initials, setInitials] = useState<string[]>([]);
  const [renderButtons, setRenderButtons] = useState(!isNewRecord);
  const [timeBeforeMenu, setTimeBeforeMenu] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeBeforeMenu((curr) => curr - 1);

      if (timeBeforeMenu === 0) {
        dispatch({ type: "CHANGE_SCREEN", payload: "START" });
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  const KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM←".split("");

  const handleKeyPress = (key: string) => {
    if (key === "←") {
      setInitials((initials) => initials.slice(0, initials.length - 1));
    } else if (initials.length !== 3) {
      setInitials([...initials, key]);
    }
  };

  const playAgain = () => {
    dispatch({ type: "START_GAME" });
  };

  const mainMenu = () => {
    dispatch({ type: "CHANGE_SCREEN", payload: "START" });
  };

  const submitNewRecord = () => {
    const historicalRecord = {
      highScores: [...state.highScores, { initials: initials.join(""), score: state.currentScore }].sort(
        (a, b) => b.score - a.score,
      ),
      gamesPlayed: state.gamesPlayed,
      pastSemesters: state.pastSemesters,
    };
    dispatch({
      type: "SET_HISTORICAL_DATA",
      payload: {
        scores: historicalRecord.highScores,
        gamesPlayed: historicalRecord.gamesPlayed,
        pastSemesters: historicalRecord.pastSemesters,
      },
    });
    saveToFile(historicalRecord);
    setRenderButtons((curr) => !curr);
  };

  return (
    <div className="w-full h-full flex-col text-center bg-slate-800 text-white p-8">
      <h1 className="font-bangers text-9xl text-red-500 text-shadow-lg">Game Over!</h1>
      <p className="text-4xl mt-4 mb-2">Your Final Score:</p>
      <p id="final-score" className="text-8xl font-bold text-yellow-400 mb-8">
        {state.currentScore}
      </p>
      <div className="grid grid-cols-2 gap-4 text-2xl mb-8 max-w-4xl w-full m-auto">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-green-400">Orders Fulfilled</p>
          <p id="orders-fulfilled" className="text-5xl font-bold">
            {state.ordersFulfilled}
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-red-400">Orders Lost</p>
          <p id="orders-lost" className="text-5xl font-bold">
            {state.ordersLost}
          </p>
        </div>
        {/* TODO: Currently not keeping track of this statistic */}
        {/* <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-blue-400">Avg. Fulfillment</p>
          <p id="avg-time" className="text-5xl font-bold">
            0s
          </p>
        </div> */}
      </div>
      <div className={`w-full max-w-2xl mx-auto ${renderButtons ? "hidden" : ""}`}>
        <p className="text-3xl text-yellow-300 font-bold mb-2">🎉 New High Score! 🎉</p>
        <p className="text-xl mb-4">Enter your initials:</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600">
            {initials[0] ?? ""}
          </div>
          <div className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600">
            {initials[1] ?? ""}
          </div>
          <div className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600">
            {initials[2] ?? ""}
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2 text-2xl font-bold">
          {KEYS.map((key) => (
            <button className="bg-slate-600 hover:bg-slate-500 p-4 rounded-lg" onClick={() => handleKeyPress(key)}>
              {key}
            </button>
          ))}
        </div>
        <button
          id="submit-initials-btn"
          className={`mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-full text-xl ${
            initials.length !== 3 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          disabled={initials.length === 3 ? false : true}
          onClick={submitNewRecord}
        >
          Submit
        </button>
      </div>
      {renderButtons && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            id="play-again-btn"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-6 px-12 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-green-700 cursor-pointer"
            onClick={playAgain}
          >
            Play Again
          </button>
          <button
            id="main-menu-btn"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-blue-700 cursor-pointer"
            onClick={mainMenu}
          >
            Main Menu
          </button>
        </div>
      )}
      <div id="auto-return-timer" className="absolute bottom-4 right-4 text-slate-400 text-lg">
        Returning to menu in <span id="auto-return-countdown">{timeBeforeMenu}</span>s...
      </div>
    </div>
  );
};
