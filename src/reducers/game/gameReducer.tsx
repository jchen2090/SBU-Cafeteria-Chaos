import type { GameStateType } from "../../providers/types";
import type { GlobalActions } from "./actions";

export function gameReducer(state: GameStateType, action: GlobalActions): GameStateType {
  switch (action.type) {
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "REMOVE_ORDER":
      throw new Error("Not implemented");
    case "CLEAR_ORDERS":
      throw new Error("Not implemented");
    case "ADD_TO_TRAY":
      return { ...state, trayItems: [...state.trayItems, action.payload] };
    case "CLEAR_TRAY":
      return { ...state, trayItems: [] };
    case "START_GAME":
      return { ...state, gameHasStarted: true };
    case "STOP_GAME":
      return { ...state, gameHasStarted: false };
    case "DECREASE_TIME":
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case "RESET_TIME":
      return { ...state, timeRemaining: state.GAME_DURATION };
    case "SUBMIT_TRAY":
      throw new Error("Not implemented");
    case "REMOVE_FROM_TRAY":
      return { ...state, trayItems: state.trayItems.filter((_, idx) => idx !== action.payload.food_idx) };
    case "SELECT_ORDER":
      return { ...state, selectedOrder: action.payload };
    case "DECREASE_ORDER_TIME":
      return {
        ...state,
        orders: state.orders
          .map((order) => ({ ...order, timeRemaining: Math.max(0, order.timeRemaining - 1) }))
          .filter((order) => order.timeRemaining > 0),
      };
    default:
      throw new Error("Missing case");
  }
}
