import type { OrderType, SavedGameType } from "../../providers/types";
import type { availableFoods } from "../../utils/Foods";

export type GlobalActions =
  | { type: "ADD_ORDER"; payload: OrderType }
  | { type: "REMOVE_ORDER"; payload: { order_idx: number } } // id
  | { type: "CLEAR_ORDERS" }
  | { type: "START_GAME" }
  | { type: "STOP_GAME" }
  | { type: "DECREASE_TIME" }
  | { type: "RESET_TIME" }
  | { type: "CLEAR_TRAY" }
  | { type: "ADD_TO_TRAY"; payload: availableFoods }
  | { type: "SUBMIT_TRAY" }
  | { type: "REMOVE_FROM_TRAY"; payload: { food_idx: number } }
  | { type: "SELECT_ORDER"; payload: OrderType }
  | { type: "DECREASE_ORDER_TIME" }
  | { type: "SET_HISTORICAL_DATA"; payload: { scores: Array<SavedGameType>; gamesPlayed: number } }
  | { type: "TOGGLE_CHALLENGE_MODE" }
  | { type: "SET_CHALLENGE_ORDER"; payload: OrderType | null };
