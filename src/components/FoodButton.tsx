import { getFoodEmoji, type availableFoods } from "../utils/Foods";

type foodButtonProps = {
  addToAssembly: (food: string) => void;
  food: availableFoods;
};

export const FoodButton = ({ food, addToAssembly }: foodButtonProps) => {
  const emoji = getFoodEmoji(food);

  return (
    <button
      className="food-item bg-slate-200 p-2 rounded-xl shadow-md flex items-center justify-center hover:bg-yellow-200 cursor-pointer"
      onClick={() => addToAssembly(emoji)}
    >
      <span className="food-emoji">{emoji}</span>
    </button>
  );
};
