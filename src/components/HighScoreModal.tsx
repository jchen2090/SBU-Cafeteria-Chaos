export const HighScoreModal = () => {
  return (
    <div
      id="modal-container"
      className="absolute inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-8"
    >
      {/* <!-- High Score Modal --> */}
      <div
        id="highscore-modal-content"
        className="modal-content bg-slate-700 text-white p-8 rounded-2xl shadow-lg w-full max-w-2xl border-4 border-yellow-400 hidden"
      >
        <h2 className="font-bangers text-7xl text-yellow-400 text-center mb-6">Hall of Fame</h2>
        <ol id="highscore-list" className="list-decimal list-inside text-3xl space-y-3">
          {/* <!-- High scores will be populated here --> */}
        </ol>
        <button className="close-modal-btn mt-8 bg-red-500 hover:bg-red-600 w-full text-white font-bold text-2xl py-3 px-8 rounded-full">
          Close
        </button>
      </div>
      {/* <!-- Daily Special Modal --> */}
      <div
        id="special-challenge-modal-content"
        className="modal-content bg-slate-700 text-white p-8 rounded-2xl shadow-lg w-full max-w-2xl border-4 border-yellow-400 hidden"
      >
        <h2 className="font-bangers text-7xl text-yellow-400 text-center mb-6">✨ Daily Special</h2>
        <div id="special-challenge-details" className="text-2xl text-center">
          {/* <!-- Challenge details will be loaded here --> */}
        </div>
        <div className="flex gap-4 mt-8">
          <button
            id="start-challenge-btn"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold text-3xl py-4 rounded-full"
          >
            Start Challenge!
          </button>
          <button className="close-modal-btn flex-1 bg-red-500 hover:bg-red-600 text-white font-bold text-3xl py-4 rounded-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
