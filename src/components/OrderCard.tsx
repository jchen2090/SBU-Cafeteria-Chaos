import type { Dispatch, SetStateAction } from "react";
import { getFoodEmoji, type availableFoods } from "../utils/Foods";
import "../index.css";

export type OrderType = {
  id: string;
  items: Array<availableFoods>;
  createdAt: number;
  shelfLife: number;
  value: number;
  isExpiring: boolean;
  isChallenge: boolean;
  name: string;
};

type OrderCardProps = {
  order: OrderType;
  setSelectedOrder: Dispatch<SetStateAction<OrderType | null>>;
};

export const OrderCard = ({ order, setSelectedOrder }: OrderCardProps) => {
  return (
    <div
      className="order-ticket p-2 rounded-lg shadow-lg flex flex-col bg-[#fffbe8]"
      onClick={() => setSelectedOrder(order)}
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

      <div className="text-center font-bold text-green-700 text-2xl -mt-1">{order.value}</div>
    </div>
  );
};
