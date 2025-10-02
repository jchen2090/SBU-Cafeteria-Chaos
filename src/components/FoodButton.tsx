type foodButtonProps = {
  imagePath?: string;
  emoji: string;
  addToAssembly: (food: string) => void;
};

export const FoodButton = ({ emoji, addToAssembly }: foodButtonProps) => {
  return (
    <button
      className="food-item bg-slate-200 p-2 rounded-xl shadow-md flex items-center justify-center hover:bg-yellow-200 cursor-pointer"
      onClick={() => addToAssembly(emoji)}
    >
      <span className="food-emoji">{emoji}</span>
    </button>
  );
};
