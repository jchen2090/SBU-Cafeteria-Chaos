import { useEffect } from "react";
import { FoodTray } from "../components/FoodTray";
import { FoodButton } from "../components/FoodButton";
import { OrderCard } from "../components/OrderCard";
import { generateRandomOrder, getAllFoods, getRandomNegativeMessage, getRandomPositiveMessage } from "../utils/Foods";
import { useGameContext } from "../providers/GameStateProvider";
import { Flip, toast, ToastContainer, Zoom } from "react-toastify";
import "../index.css";

export const GameScreen = () => {
  const { state, dispatch } = useGameContext();
  const foods = getAllFoods();

  const timeBarPercentage = (state.timeRemaining / state.config.GAME_DURATION) * 100;

  useEffect(() => {
    state.clearedOrders.forEach((order) => {
      if (order.hasDisplayedToast) {
        return;
      }

      if (order.isCompleted) {
        const message = getRandomPositiveMessage();
        toast(`"${message}"`, {
          closeButton: false,
          className: "font-bold flex justify-center !bg-green-200/50 !text-green-800 mt-20 !w-3xl !text-3xl",
        });
        toast(`+${order.penalty}`, {
          closeButton: false,
          position: "top-left",
          className: "!font-bangers !text-3xl font-bold justify-end !bg-transparent !text-green-500 !shadow-none !w-64",
          transition: Flip,
        });
        dispatch({ type: "REMOVE_FROM_CLEARED_ORDERS", payload: order });
      } else {
        const message = getRandomNegativeMessage();
        toast(`"${message}"`, {
          closeButton: false,
          className: "font-bold flex justify-center !bg-red-200/50 !text-red-800 mt-20 !w-3xl !text-3xl",
        });
        toast(`${order.penalty}`, {
          closeButton: false,
          position: "top-left",
          className: "!font-bangers !text-3xl font-bold justify-end !bg-transparent !text-red-500 !shadow-none !w-64",
          transition: Flip,
        });
        dispatch({ type: "REMOVE_FROM_CLEARED_ORDERS", payload: order });
      }
    });
  }, [dispatch, state.clearedOrders]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "DECREASE_ORDER_TIME" });

      // Pity, the challenge order needs to show up at least once
      if (state.isChallenge && state.timeRemaining === 10 && state.challengeOrder) {
        dispatch({ type: "ADD_ORDER", payload: state.challengeOrder });
        dispatch({ type: "SET_CHALLENGE_ORDER", payload: null });

        // Return so that special order wont show up twice
        return;
      }

      // Do not create more orders
      if (state.orders.length === state.config.MAX_ORDERS) {
        return;
      }

      // If no orders, immediately genereate one
      if (state.orders.length === 0) {
        dispatch({ type: "ADD_ORDER", payload: generateRandomOrder(state.config.ORDER_SHELF_LIFE) });
        return;
      }
      const rng = Math.min(0.25 + (state.config.DIFFICULTY - 1) * 0.15, 1);
      // Challenge orders always have a 33% to spawn in if a regular order doesn't spawn
      const specialOrderRng = 0.33;

      if (Math.random() < rng) {
        dispatch({ type: "ADD_ORDER", payload: generateRandomOrder(state.config.ORDER_SHELF_LIFE) });
      } else if (Math.random() < specialOrderRng && state.challengeOrder) {
        dispatch({ type: "ADD_ORDER", payload: state.challengeOrder });

        dispatch({ type: "SET_CHALLENGE_ORDER", payload: null });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    dispatch,
    state.challengeOrder,
    state.config.DIFFICULTY,
    state.config.MAX_ORDERS,
    state.config.ORDER_SHELF_LIFE,
    state.isChallenge,
    state.orders.length,
    state.timeRemaining,
  ]);

  // TODO: Fix this code redundancy...
  if (state.config.FOOD_TRAY_POSITION === "BOTTOM") {
    return (
      <div id="game-screen" className="flex game-screen w-full h-full flex-col relative bg-gray-300">
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

        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg z-10">
          <div className="text-2xl md:text-4xl font-bold">
            Score: <span id="score">{state.currentScore}</span>
          </div>
          <div id="game-name-ingame-display" className="text-4xl md:text-6xl font-bangers text-yellow-300">
            Cafeteria Chaos
          </div>
          <div className="text-2xl md:text-4xl font-bold">
            Time: <span id="time">{state.timeRemaining}</span>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-300">
          <div
            id="timer-bar"
            style={{
              width: `${timeBarPercentage}%`,
            }}
            className={"h-full bg-green-500 timer-bar-inner"}
          ></div>
        </div>

        <div
          id="order-area"
          className="flex-grow w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 overflow-y-auto"
        >
          {state.orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
        <FoodTray />

        <div
          id="food-selection"
          className="flex justify-center items-center gap-4 p-4 bg-slate-700 border-t-8 border-slate-900"
        >
          {foods.map((food, idx) => (
            <FoodButton food={food} key={idx} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div id="game-screen" className="flex game-screen w-full h-full flex-col relative bg-gray-300">
        {/* <div id="demo-overlay" className="hidden"></div> */}
        <ToastContainer
          position="bottom-center"
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

        <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg z-10">
          <div className="text-2xl md:text-4xl font-bold">
            Score: <span id="score">{state.currentScore}</span>
          </div>
          <div id="game-name-ingame-display" className="text-4xl md:text-6xl font-bangers text-yellow-300">
            Cafeteria Chaos
          </div>
          <div className="text-2xl md:text-4xl font-bold">
            Time: <span id="time">{state.timeRemaining}</span>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-300">
          <div
            id="timer-bar"
            style={{
              width: `${timeBarPercentage}%`,
            }}
            className={"h-full bg-green-500 timer-bar-inner"}
          ></div>
        </div>

        <div
          id="food-selection"
          className="flex justify-center items-center gap-4 p-4 bg-slate-700 border-t-8 border-slate-900"
        >
          {foods.map((food, idx) => (
            <FoodButton food={food} key={idx} />
          ))}
        </div>

        <FoodTray />

        <div
          id="order-area"
          className="flex-grow w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 overflow-y-auto"
        >
          {state.orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    );
  }
};
