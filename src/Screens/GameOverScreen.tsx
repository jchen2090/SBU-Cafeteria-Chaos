export const GameOverScreen = () => {
  return (
    <div
      id="game-over-screen"
      className="w-full h-full hidden flex-col items-center justify-center text-center bg-slate-800 text-white p-8 relative overflow-y-auto"
    >
      <h1
        className="font-bangers text-9xl text-red-500"
        // style="text-shadow: 4px 4px 0px #000"
      >
        Game Over!
      </h1>
      <p className="text-4xl mt-4 mb-2">Your Final Score:</p>
      <p id="final-score" className="text-8xl font-bold text-yellow-400 mb-8">
        0
      </p>

      <div className="grid grid-cols-3 gap-4 text-2xl mb-8 w-full max-w-4xl">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-green-400">Orders Fulfilled</p>
          <p id="orders-fulfilled" className="text-5xl font-bold">
            0
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-red-400">Orders Lost</p>
          <p id="orders-lost" className="text-5xl font-bold">
            0
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="font-bold text-blue-400">Avg. Fulfillment</p>
          <p id="avg-time" className="text-5xl font-bold">
            0s
          </p>
        </div>
      </div>

      <div id="new-highscore-input" className="hidden w-full max-w-2xl">
        <p className="text-3xl text-yellow-300 font-bold mb-2">🎉 New High Score! 🎉</p>
        <p className="text-xl mb-4">Enter your initials:</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            id="initial-1"
            className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600"
          ></div>
          <div
            id="initial-2"
            className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600"
          ></div>
          <div
            id="initial-3"
            className="w-20 h-24 bg-slate-900 text-6xl font-bold flex items-center justify-center rounded-lg border-4 border-slate-600"
          ></div>
        </div>
        <div id="on-screen-keyboard" className="grid grid-cols-10 gap-2 text-2xl font-bold">
          {/* <!-- Keys will be generated here --> */}
        </div>
        <button
          id="submit-initials-btn"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-full text-xl opacity-50 cursor-not-allowed"
          disabled
        >
          Submit
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          id="play-again-btn"
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-4xl py-6 px-12 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-green-700"
        >
          Play Again
        </button>
        <button
          id="main-menu-btn"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg border-4 border-blue-700"
        >
          Main Menu
        </button>
      </div>

      <div id="auto-return-timer" className="absolute bottom-4 right-4 text-slate-400 text-lg">
        Returning to menu in <span id="auto-return-countdown">15</span>s...
      </div>
    </div>
  );
};
