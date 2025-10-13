import "./index.css";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { useEffect } from "react";
import { GameOverScreen } from "./screens/GameOverScreen";
import { useGameContext } from "./providers/GameStateProvider";
import type { HistoricalDataType } from "./providers/types";
import { saveToFile } from "./utils/Scores";
import { DemoScreen } from "./screens/DemoScreen";

function App() {
  const { state, dispatch } = useGameContext();

  // const timeBarPercentage = (state.timeRemaining / state.config.GAME_DURATION) * 100;

  // Demo screen logic
  // BUG: Refactor and recheck logic, we're still hitting this even on the endscreen and game screen. I've put a bandaid solution in the loaded component
  useEffect(() => {
    let interval = setInterval(() => {
      if (!state.isDemoMode) {
        dispatch({ type: "TOGGLE_DEMO_MODE", payload: true });
      }
    }, 4000);

    document.body.addEventListener("click", () => {
      clearInterval(interval);

      interval = setInterval(() => {
        if (!state.isDemoMode) {
          dispatch({ type: "TOGGLE_DEMO_MODE", payload: true });
        }
      }, 4000);
    });

    return () => clearInterval(interval);
  }, [dispatch, state.isDemoMode]);

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

  if (state.isDemoMode && !state.gameHasStarted && !state.gameIsOver) {
    loadedComponent = <DemoScreen />;
  } else if (state.gameIsOver) {
    loadedComponent = <GameOverScreen />;
  } else if (state.gameHasStarted) {
    loadedComponent = <GameScreen />;
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
