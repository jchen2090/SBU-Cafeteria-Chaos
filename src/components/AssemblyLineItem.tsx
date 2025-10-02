type AssemblyLineItemProps = {
  emoji: string;
  removeFromAssembly: (food: number) => void;
  idx: number;
};

export const AssemblyLineItem = ({ emoji, idx, removeFromAssembly }: AssemblyLineItemProps) => {
  return (
    <button
      className="p-2 rounded-xl flex items-center justify-center hover:bg-yellow-200 cursor-pointer assembly-item h-20 w-20"
      onClick={() => removeFromAssembly(idx)}
    >
      <span className="food-emoji">{emoji}</span>
    </button>
  );
};
