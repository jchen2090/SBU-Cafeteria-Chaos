import { useGameContext } from "../providers/GameStateProvider";

type AssemblyLineItemProps = {
  emoji: string;
  idx: number;
};

export const FoodTrayItem = ({ emoji, idx }: AssemblyLineItemProps) => {
  const { dispatch } = useGameContext();

  return (
    <button
      className="p-2 rounded-xl flex items-center justify-center hover:bg-yellow-200 cursor-pointer assembly-item h-20 w-20"
      onClick={() => dispatch({ type: "REMOVE_FROM_TRAY", payload: { food_idx: idx } })}
    >
      <span className="food-emoji">{emoji}</span>
    </button>
  );
};
