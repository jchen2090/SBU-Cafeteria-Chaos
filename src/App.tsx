import "./index.css";
import { StartScreen } from "./Screens/StartScreen";
import { GameScreen } from "./Screens/GameScreen";
import { useEffect, useRef, useState } from "react";
import { GameOverScreen } from "./Screens/GameOverScreen";

function App() {
  const GAME_DURATION = 60;

  const [gameStarted, setGameStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(GAME_DURATION);

  const timeLeft = useRef(GAME_DURATION);
  const timeBarPercentage = (currentTime / GAME_DURATION) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(interval);
          setCurrentTime(60);
          setGameStarted(false);
          return 0;
        }
        timeLeft.current = currentTime - 1;
        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let loadedComponent;

  if (currentTime == 0) {
    loadedComponent = <GameOverScreen />;
  } else if (gameStarted) {
    loadedComponent = <GameScreen currentTime={currentTime} timeBarPercentage={timeBarPercentage} />;
  } else {
    loadedComponent = <StartScreen setGameStarted={setGameStarted} />;
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
