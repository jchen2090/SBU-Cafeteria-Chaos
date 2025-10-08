import { useState } from "react";
import { AssemblyLine } from "../components/AssemblyLine";
import { FoodButton } from "../components/FoodButton";
import { OrderCard, type OrderType } from "../components/OrderCard";
import { getAllFoods } from "../utils/Foods";

type GameScreenProps = {
  currentTime: number;
  timeBarPercentage: number;
};

export const GameScreen = ({ currentTime, timeBarPercentage }: GameScreenProps) => {
  const currentDate = Date.now();
  const [orders, setOrders] = useState<[OrderType]>([
    {
      id: "t1",
      items: ["burger", "pizza"],
      createdAt: currentDate,
      shelfLife: 50,
      value: 25,
      isExpiring: false,
      isChallenge: false,
      name: "test",
    },
  ]);
  const [assmeblyItems, setAssemblyItems] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const addToAssmembly = (food: string) => {
    setAssemblyItems((assembly) => [...assembly, food]);
  };

  const removeFromAssembly = (idx: number) => {
    setAssemblyItems((assembly) => assembly.filter((_, i) => i !== idx));
  };

  const clearAssemblyLine = () => {
    setAssemblyItems([]);
  };

  const submitAssemblyLine = () => {
    clearAssemblyLine();
    //TODO: Submit logic here
  };

  const foods = getAllFoods();

  const TopBar = () => {
    return (
      <>
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg z-10">
          <div className="text-2xl md:text-4xl font-bold">
            Score: <span id="score">0</span>
          </div>
          <div id="game-name-ingame-display" className="text-4xl md:text-6xl font-bangers text-yellow-300">
            Cafeteria Chaos
          </div>
          <div className="text-2xl md:text-4xl font-bold">
            Time: <span id="time">{currentTime}</span>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-300">
          <div id="timer-bar" className={`h-full bg-green-500 timer-bar-inner w-[${timeBarPercentage}%]`}></div>
        </div>
      </>
    );
  };

  return (
    <div id="game-screen" className="flex game-screen w-full h-full flex-col relative bg-gray-300">
      {/* <div id="demo-overlay" className="hidden"></div> */}
      {/* <!-- Top Bar --> */}
      <TopBar />

      {/* <!-- Order Area --> */}
      <div
        id="order-area"
        className="flex-grow w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 overflow-y-auto"
      >
        {orders.map((order) => (
          <OrderCard order={order} setSelectedOrder={setSelectedOrder} />
        ))}
        {/* <!-- Order tickets will be injected here --> */}
      </div>

      {/* <!-- Feedback Areas --> */}
      {/* <div
        id="feedback-area"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
      ></div>
      <div
        id="customer-feedback-area"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-1/2 pointer-events-none z-20"
      ></div> */}

      {/* <!-- Current Assembly Area --> */}

      <AssemblyLine
        items={assmeblyItems}
        removeFromAssembly={removeFromAssembly}
        clearAssemblyLine={clearAssemblyLine}
        submitAssemblyLine={submitAssemblyLine}
      />

      {/* <!-- Food Selection Area --> */}

      <div
        id="food-selection"
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 p-4 bg-slate-700 border-t-8 border-slate-900"
      >
        {foods.map((food) => (
          <FoodButton food={food} addToAssembly={addToAssmembly} />
        ))}
      </div>
    </div>
  );
};
