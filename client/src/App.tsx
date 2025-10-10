import "./index.css";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { useEffect } from "react";
import { GameOverScreen } from "./screens/GameOverScreen";
import { GAME_CONFIG, useGameContext } from "./providers/GameStateProvider";
import type { HistoricalDataType } from "./providers/types";
import { saveToFile } from "./utils/Scores";

function App() {
  const { state, dispatch } = useGameContext();

  const timeBarPercentage = (state.timeRemaining / GAME_CONFIG.GAME_DURATION) * 100;

  useEffect(() => {
    if (state.gameHasStarted) {
      const interval = setInterval(() => {
        dispatch({ type: "DECREASE_TIME" });

        if (state.timeRemaining <= 1) {
          const dataToSave: HistoricalDataType = {
            highScores: state.highScores,
            gamesPlayed: state.gamesPlayed,
          };

          clearInterval(interval);
          saveToFile(dataToSave);
          dispatch({ type: "STOP_GAME" });
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [dispatch, state.timeRemaining, state.gameHasStarted, state.highScores, state.gamesPlayed]);

  let loadedComponent;

  if (state.timeRemaining === 0) {
    loadedComponent = <GameOverScreen />;
  } else if (state.gameHasStarted) {
    loadedComponent = <GameScreen timeBarPercentage={timeBarPercentage} />;
  } else {
    loadedComponent = <StartScreen />;
  }

  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
      <div id="game-container" className="w-full h-full mx-auto shadow-2xl rounded-lg overflow-hidden">
        {loadedComponent}
      </div>
    </div>
  );
}
export default App;
