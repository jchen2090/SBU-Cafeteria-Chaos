import type { clearedOrderType, OrderType, SavedGameType } from "../../providers/types";
import type { availableFoods } from "../../utils/Foods";

export type GlobalActions =
  | { type: "ADD_ORDER"; payload: OrderType }
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
  | { type: "SET_CHALLENGE_ORDER"; payload: OrderType | null }
  | { type: "REDUCE_SCORE"; payload: number }
  | { type: "REMOVE_FROM_CLEARED_ORDERS"; payload: clearedOrderType }
  | { type: "CHANGE_TRAY_POSITION"; payload: "TOP" | "BOTTOM" };
