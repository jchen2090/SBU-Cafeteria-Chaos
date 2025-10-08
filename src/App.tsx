import "./index.css";
import { StartScreen } from "./Screens/StartScreen";
import { GameScreen } from "./Screens/GameScreen";
import { useEffect } from "react";
import { GameOverScreen } from "./Screens/GameOverScreen";
import { useGameContext } from "./providers/GameStateProvider";

function App() {
  const { state, dispatch } = useGameContext();

  const timeBarPercentage = (state.timeRemaining / state.GAME_DURATION) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "DECREASE_TIME" });

      if (state.timeRemaining <= 1) {
        clearInterval(interval);
        dispatch({ type: "RESET_TIME" });
        dispatch({ type: "STOP_GAME" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, state.timeRemaining]);

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
