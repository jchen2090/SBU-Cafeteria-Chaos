import { Flip, toast, ToastContainer, Zoom } from "react-toastify";
import { FoodButton } from "../components/FoodButton";
import { OrderCard } from "../components/OrderCard";
import { getAllFoods, getFoodEmoji, getRandomPositiveMessage, type availableFoods } from "../utils/Foods";
import { useEffect, useState } from "react";
import { FoodTrayItem } from "../components/FoodTrayItem";
import type { OrderType } from "../providers/types";
import { useGameContext } from "../providers/GameStateProvider";
import { Button } from "@/components/ui/button";

// TODO: Refactor this(?) straight copied from GameScreen.tsx
export const DemoScreen = () => {
  const { dispatch } = useGameContext();
  const [testOrder, setTestOrder] = useState<OrderType[]>([
    {
      id: "t1",
      items: ["burger", "pizza"],
      timeRemaining: 20,
      shelfLife: 20,
      value: 25,
      isChallenge: false,
    },
  ]);
  const [score, setScore] = useState(0);
  const foods = getAllFoods();
  const [trayItems, setTrayItems] = useState<availableFoods[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testOrder.length === 0) {
        dispatch({ type: "CHANGE_SCREEN", payload: "START" });
      }

      if (trayItems.length === 0) {
        setTrayItems((curr) => [...curr, "burger"]);
      } else if (trayItems.length === 1) {
        setTrayItems((curr) => [...curr, "pizza"]);
      } else {
        setScore((curr) => curr + testOrder[0].value);
        setTrayItems([]);
        setTestOrder([]);
        const message = getRandomPositiveMessage();
        toast(`"${message}"`, {
          closeButton: false,
          className: "font-bold flex justify-center !bg-green-200/50 !text-green-800 mt-20 !w-3xl !text-3xl",
        });
        toast(`+${testOrder[0].value}`, {
          closeButton: false,
          position: "top-left",
          className: "!font-bangers !text-3xl font-bold justify-end !bg-transparent !text-green-500 !shadow-none !w-64",
          transition: Flip,
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [dispatch, testOrder, trayItems.length]);

  const ItemsLinedUp = () => {
    return trayItems.map((item, idx) => {
      return <FoodTrayItem emoji={getFoodEmoji(item)} idx={idx} key={idx} />;
    });
  };

  const TopBar = () => {
    return (
      <>
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg z-10">
          <div className="text-2xl md:text-4xl font-bold">
            Score: <span id="score">{score}</span>
          </div>
          <div id="game-name-ingame-display" className="text-4xl md:text-6xl font-bangers text-yellow-300">
            Cafeteria Chaos
          </div>
          <div className="text-2xl md:text-4xl font-bold">
            Time: <span id="time">DEMO</span>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-300">
          <div
            id="timer-bar"
            style={{
              width: `100%`,
            }}
            className={"h-full bg-green-500 timer-bar-inner"}
          ></div>
        </div>
      </>
    );
  };

  return (
    <div
      id="game-screen"
      className="flex game-screen w-full h-full flex-col relative bg-gray-300"
      onClick={() => dispatch({ type: "MAIN_MENU" })}
    >
      {/* <div id="demo-overlay" className="hidden"></div> */}
      <ToastContainer
        position="top-center"
        autoClose={750}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <TopBar />

      <div
        id="order-area"
        className="flex-grow w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 overflow-y-auto"
      >
        {testOrder.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>

      <div className="w-full bg-slate-200 p-4 border-t-4 border-slate-300 flex items-center gap-4">
        <Button
          variant="destructive"
          className="text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-red-800 h-full cursor-pointer"
          onClick={() => dispatch({ type: "CLEAR_TRAY" })}
        >
          CLEAR
        </Button>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-center text-slate-700 mb-2">Your Tray</h2>
          <div className="h-24 lg:h-28 bg-white rounded-lg shadow-inner flex items-center justify-center gap-4 p-2 overflow-x-auto">
            {trayItems.length === 0 ? (
              <p className="text-gray-400">Tap food items to add them here</p>
            ) : (
              <ItemsLinedUp />
            )}
          </div>
        </div>
        <Button
          className="text-white font-bold text-3xl py-8 px-6 rounded-lg shadow-lg border-4 border-green-700 h-full cursor-pointer"
          onClick={() => dispatch({ type: "SUBMIT_TRAY" })}
        >
          SUBMIT
        </Button>
      </div>

      <div
        id="food-selection"
        className="flex justify-center items-center gap-4 p-4 bg-slate-700 border-t-8 border-slate-900"
      >
        {foods.map((food) => (
          <FoodButton food={food} />
        ))}
      </div>
    </div>
  );
};
