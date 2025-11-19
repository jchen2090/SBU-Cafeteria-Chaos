import { useGameContext } from "../providers/GameStateProvider";
import { getFoodEmoji } from "../utils/Foods";
import { FoodTrayItem } from "./FoodTrayItem";

export const FoodTray = () => {
  const { state, dispatch } = useGameContext();
  const ItemsLinedUp = () => {
    return state.trayItems.map((item, idx) => {
      return <FoodTrayItem emoji={getFoodEmoji(item)} idx={idx} key={idx} />;
    });
  };

  return (
    <div className="w-full bg-slate-200 p-4 border-t-4 border-slate-300 flex items-center gap-4">
      <button
        id="clear-tray-btn"
        className="bg-[#bc4749] hover:bg-[#bc4749] text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-[#963638] h-full cursor-pointer"
        onClick={() => dispatch({ type: "CLEAR_TRAY" })}
      >
        CLEAR
      </button>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-2">Your Tray</h2>
        <div className="h-24 lg:h-28 bg-white rounded-lg shadow-inner flex items-center justify-center gap-4 p-2 overflow-x-auto">
          {/* <!-- Assembled items will appear here --> */}
          {state.trayItems.length === 0 ? (
            <p className="text-gray-400">Tap food items to add them here</p>
          ) : (
            <ItemsLinedUp />
          )}
        </div>
      </div>
      <button
        id="submit-order-btn"
        className="bg-[#6a994e] hover:bg-[#6a994e] text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-[#386641] h-full cursor-pointer"
        onClick={() => dispatch({ type: "SUBMIT_TRAY" })}
      >
        SUBMIT
      </button>
    </div>
  );
};
