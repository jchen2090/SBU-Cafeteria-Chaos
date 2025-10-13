import { useGameContext } from "../providers/GameStateProvider";
import { getFoodEmoji, type availableFoods } from "../utils/Foods";

type foodButtonProps = {
  food: availableFoods;
};

export const FoodButton = ({ food }: foodButtonProps) => {
  const { dispatch } = useGameContext();
  const emoji = getFoodEmoji(food);

  return (
    <button
      className="food-item bg-slate-200 p-2 rounded-xl shadow-md flex items-center justify-center hover:bg-yellow-200 cursor-pointer flex-1"
      onClick={() => dispatch({ type: "ADD_TO_TRAY", payload: food })}
    >
      <span className="food-emoji">{emoji}</span>
    </button>
  );
};
