import "./index.css";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { useEffect, useState } from "react";
import { GameOverScreen } from "./screens/GameOverScreen";
import { useGameContext } from "./providers/GameStateProvider";
import type { HistoricalDataType } from "./providers/types";
import { saveToFile } from "./utils/Scores";
import { DemoScreen } from "./screens/DemoScreen";

function App() {
  const { state, dispatch } = useGameContext();

  const [highScoreModal, setHighScoreModal] = useState(false);
  const [dailySpecialModal, setDailySpecialModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const { screen } = state;

  // Demo screen logic
  useEffect(() => {
    // Only run if we're on the START screen
    if (screen !== "START") return;

    let interval = setInterval(() => {
      dispatch({ type: "CHANGE_SCREEN", payload: "DEMO" });
    }, 4000);

    const handleClick = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        dispatch({ type: "CHANGE_SCREEN", payload: "DEMO" });
      }, 4000);
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      clearInterval(interval);
      document.body.removeEventListener("click", handleClick);
    };
  }, [dispatch, screen]);

  // Time decrease logic
  useEffect(() => {
    if (screen === "GAME") {
      const interval = setInterval(() => {
        dispatch({ type: "DECREASE_TIME" });

        if (state.timeRemaining <= 1) {
          const dataToSave: HistoricalDataType = {
            highScores: state.highScores,
            gamesPlayed: state.gamesPlayed,
          };

          clearInterval(interval);
          saveToFile(dataToSave);
          dispatch({ type: "CHANGE_SCREEN", payload: "END" });
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [dispatch, screen, state.gamesPlayed, state.highScores, state.timeRemaining]);

  useEffect(() => {
    if (screen === "GAME") {
      const interval = setInterval(() => {
        dispatch({ type: "INCREASE_DIFFICULTY" });
      }, Math.floor(state.config.GAME_DURATION / 4) * 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch, screen, state.config.GAME_DURATION]);

  let loadedComponent;

  if (state.screen === "DEMO") {
    loadedComponent = <DemoScreen />;
  } else if (state.screen === "END") {
    loadedComponent = <GameOverScreen />;
  } else if (state.screen === "GAME") {
    loadedComponent = <GameScreen />;
  } else {
    // FIXME: Surely there has to be a better way of implementing this...
    loadedComponent = (
      <StartScreen
        highScoreModal={highScoreModal}
        setHighScoreModal={setHighScoreModal}
        dailySpecialModal={dailySpecialModal}
        setDailySpecialModal={setDailySpecialModal}
        settingsModal={settingsModal}
        setSettingsModal={setSettingsModal}
      />
    );
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
