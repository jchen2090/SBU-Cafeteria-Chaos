import { type Dispatch, type SetStateAction } from "react";
import { HighScoreModal } from "../components/HighScoreModal";
import { useGameContext } from "../providers/GameStateProvider";
import { DailySpecialModal } from "../components/DailySpecialModal";
import { SettingsModal } from "../components/SettingsModal";
import { FeedbackModal } from "../components/FeedbackModal";

// TODO: This needs to change
interface StartScreenProps {
  highScoreModal: boolean;
  setHighScoreModal: Dispatch<SetStateAction<boolean>>;
  dailySpecialModal: boolean;
  setDailySpecialModal: Dispatch<SetStateAction<boolean>>;
  settingsModal: boolean;
  setSettingsModal: Dispatch<SetStateAction<boolean>>;
  feedbackModal: boolean;
  setFeedbackModal: Dispatch<SetStateAction<boolean>>;
}

export const StartScreen = ({
  highScoreModal,
  setHighScoreModal,
  dailySpecialModal,
  setDailySpecialModal,
  settingsModal,
  setSettingsModal,
  feedbackModal,
  setFeedbackModal,
}: StartScreenProps) => {
  const { state, dispatch } = useGameContext();

  const startGame = () => {
    dispatch({ type: "START_GAME" });
  };

  const openHighScoresModal = () => {
    setHighScoreModal(true);
    dispatch({ type: "CHANGE_SCREEN", payload: "HIGHSCORES_MODAL" });
  };

  const openDailySpecialModal = () => {
    setDailySpecialModal(true);
    dispatch({ type: "CHANGE_SCREEN", payload: "DAILY_SPECIAL_MODAL" });
  };

  const openSettingsModal = () => {
    setSettingsModal(true);
    dispatch({ type: "CHANGE_SCREEN", payload: "SETTINGS_MODAL" });
  };

  const openFeedbackModal = () => {
    setFeedbackModal(true);
    dispatch({ type: "CHANGE_SCREEN", payload: "FEEDBACK" });
  };

  return (
    <div
      id="start-screen"
      className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8 relative"
    >
      {/* Falling Snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70 animate-[fall_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDuration: `${8 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <div id="attract-mode-container" className="absolute inset-0 pointer-events-none overflow-hidden z-20"></div>
      <div className="bg-black/60  p-12 rounded-2xl shadow-lg relative ">
        <div
          id="top-left-stats"
          className="absolute top-4 left-4 text-white text-2xl font-bold p-3 rounded-lg text-left"
        >
          <div>
            Games Played: <span id="games-played-display">{state.gamesPlayed}</span>
          </div>
        </div>
        <div
          id="top-right-stats"
          className="absolute top-4 right-4 text-white text-2xl font-bold p-3 rounded-lg text-right"
        >
          <div>
            High Score:{" "}
            <span id="top-score-display">{state.highScores.length > 0 ? state.highScores[0].score : 0}</span>
          </div>
        </div>
        <h1
          id="game-name-display"
          className="font-bangers text-8xl mt-8 md:text-9xl text-[#bb4446] text-shadow[4px_4px_0_0]"
        >
          🎄SBU Eat's Cafeteria Chaos🎄
        </h1>
        <p>(Holiday Edition)</p>
        <p
          id="game-headline-display"
          className="text-2xl md:text-3xl mt-4 mb-8 min-h-[64px] flex items-center justify-center"
        >
          Happy Holidays from SBU Eats!
        </p>

        <div id="main-menu-controls">
          <button
            id="start-game-btn"
            className="bg-[#386641] hover:bg-[#386641] text-white font-bold text-4xl py-6 px-12 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-[#2a4c30] cursor-pointer"
            onClick={startGame}
          >
            Start Game
          </button>
          <div className="flex gap-4 justify-center items-center mt-6">
            <button
              id="high-scores-btn"
              className="bg-[#6a994e] hover:bg-[#6a994e] text-white font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-[#386641] cursor-pointer"
              onClick={openHighScoresModal}
            >
              High Scores
            </button>
            <button
              id="special-challenge-btn"
              className="bg-[#bc4749] hover:bg-[#bc4749] text-slate-200 font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-[#963638] cursor-pointer"
              onClick={openDailySpecialModal}
            >
              ✨ Daily Special
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-[#f2e8cf] hover:bg-[#f2e8cf] text-black font-medium text-2xl px-8 py-0.5 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-[#e5d19f] cursor-pointer"
              onClick={openSettingsModal}
            >
              ⚙️ Change Prep Area
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#6a994e] hover:bg-[#6a994e] text-white font-medium text-2xl px-8 py-0.5 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-[#386641] cursor-pointer"
              onClick={openFeedbackModal}
            >
              Provide Feedback
            </button>
          </div>
        </div>
      </div>
      <HighScoreModal open={highScoreModal} onOpenChange={setHighScoreModal} />
      <DailySpecialModal open={dailySpecialModal} onOpenChange={setDailySpecialModal} />
      <SettingsModal open={settingsModal} onOpenChange={setSettingsModal} />
      <FeedbackModal open={feedbackModal} onOpenChange={setFeedbackModal} />

      {/* Custom CSS for snowflake animation */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
