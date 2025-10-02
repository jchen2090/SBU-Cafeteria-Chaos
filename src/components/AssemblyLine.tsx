import { AssemblyLineItem } from "./AssemblyLineItem";

type AssembyLineProps = {
  items: Array<string>;
  removeFromAssembly: (item: number) => void;
  clearAssemblyLine: () => void;
  submitAssemblyLine: () => void;
};

export const AssemblyLine = ({
  items,
  removeFromAssembly,
  clearAssemblyLine,
  submitAssemblyLine,
}: AssembyLineProps) => {
  const ItemsLinedUp = () => {
    return items.map((item, idx) => {
      return <AssemblyLineItem emoji={item} removeFromAssembly={removeFromAssembly} idx={idx} key={idx} />;
    });
  };

  return (
    <div className="w-full bg-slate-200 p-4 border-t-4 border-slate-300 flex items-center gap-4">
      <button
        id="clear-tray-btn"
        className="bg-red-600 hover:bg-red-700 text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-red-800 h-full cursor-pointer"
        onClick={() => clearAssemblyLine()}
      >
        CLEAR
      </button>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-2">Your Tray</h2>
        <div className="h-24 lg:h-28 bg-white rounded-lg shadow-inner flex items-center justify-center gap-4 p-2 overflow-x-auto">
          {/* <!-- Assembled items will appear here --> */}
          {items.length === 0 ? <p className="text-gray-400">Tap food items to add them here</p> : <ItemsLinedUp />}
        </div>
      </div>
      <button
        id="submit-order-btn"
        className="bg-green-500 hover:bg-green-600 text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-green-700 h-full cursor-pointer"
        onClick={() => submitAssemblyLine()}
      >
        SUBMIT
      </button>
    </div>
  );
};
