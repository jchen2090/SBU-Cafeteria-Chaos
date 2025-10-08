import type { OrderType } from "../../providers/types";

export type GlobalActions =
  | { type: "ADD_ORDER"; payload: OrderType }
  | { type: "REMOVE_ORDER"; payload: { order_idx: number } } // id
  | { type: "CLEAR_ORDERS" }
  | { type: "START_GAME" }
  | { type: "STOP_GAME" }
  | { type: "DECREASE_TIME" }
  | { type: "RESET_TIME" }
  | { type: "CLEAR_TRAY" }
  | { type: "ADD_TO_TRAY"; payload: string }
  | { type: "SUBMIT_TRAY" }
  | { type: "REMOVE_FROM_TRAY"; payload: { food_idx: number } }
  | { type: "SELECT_ORDER"; payload: OrderType }
  | { type: "DECREASE_ORDER_TIME" };
