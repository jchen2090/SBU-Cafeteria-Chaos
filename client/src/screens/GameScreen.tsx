import { useEffect } from "react";
import { FoodTray } from "../components/FoodTray";
import { FoodButton } from "../components/FoodButton";
import { OrderCard } from "../components/OrderCard";
import { generateRandomOrder, getAllFoods } from "../utils/Foods";
import { GAME_CONFIG, useGameContext } from "../providers/GameStateProvider";

type GameScreenProps = {
  timeBarPercentage: number;
};

export const GameScreen = ({ timeBarPercentage }: GameScreenProps) => {
  const { state, dispatch } = useGameContext();
  const foods = getAllFoods();

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
      if (state.orders.length === GAME_CONFIG.MAX_ORDERS) {
        return;
      }

      // If no orders, immediately genereate one
      if (state.orders.length === 0) {
        dispatch({ type: "ADD_ORDER", payload: generateRandomOrder() });
      }
      const rng = Math.min(0.25 + (GAME_CONFIG.DIFFICULTY - 1) * 0.15, 1);
      // Challenge orders always have a 33% to spawn in if a regular order doesn't spawn
      const specialOrderRng = 0.33;

      if (Math.random() < rng) {
        dispatch({ type: "ADD_ORDER", payload: generateRandomOrder() });
      } else if (Math.random() < specialOrderRng && state.challengeOrder) {
        dispatch({ type: "ADD_ORDER", payload: state.challengeOrder });

        console.log("Add challenge order");
        dispatch({ type: "SET_CHALLENGE_ORDER", payload: null });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, state.challengeOrder, state.isChallenge, state.orders.length, state.timeRemaining]);

  const TopBar = () => {
    return (
      <>
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
        {state.orders.map((order) => (
          <OrderCard order={order} />
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

      <FoodTray />

      {/* <!-- Food Selection Area --> */}

      <div
        id="food-selection"
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 p-4 bg-slate-700 border-t-8 border-slate-900"
      >
        {foods.map((food) => (
          <FoodButton food={food} />
        ))}
      </div>
    </div>
  );
};
