import { getFoodEmoji } from "../utils/Foods";
import "../index.css";
import type { OrderType } from "../providers/types";
import { useGameContext } from "../providers/GameStateProvider";

type OrderCardProps = {
  order: OrderType;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const { dispatch } = useGameContext();
  const timeBarPercentage = (order.timeRemaining / order.shelfLife) * 100;

  return (
    <div
      className="order-ticket p-2 rounded-lg shadow-lg flex flex-col bg-[#fffbe8]"
      onClick={() => dispatch({ type: "SELECT_ORDER", payload: order })}
    >
      <div className="flex-grow flex justify-center items-center gap-2 flex-wrap">
        {order.items.map((item) => {
          const emoji = getFoodEmoji(item);

          return (
            <div className="h-12 w-12">
              <span className="food-emoji">{emoji}</span>
            </div>
          );
        })}
      </div>
      <div className="text-center font-bold text-green-700 text-2xl -mt-1">{order.value}</div>{" "}
      <div className="w-full h-4 bg-gray-300">
        <div
          id="timer-bar"
          style={{
            width: `${timeBarPercentage}%`,
          }}
          className={"h-full bg-green-500 timer-bar-inner"}
        ></div>
      </div>
    </div>
  );
};
