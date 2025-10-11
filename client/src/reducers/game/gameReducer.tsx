import { GAME_CONFIG, initialState } from "../../providers/GameStateProvider";
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
      return { ...state, gameHasStarted: true, gamesPlayed: state.gamesPlayed + 1 };
    case "STOP_GAME":
      return { ...initialState, gamesPlayed: state.gamesPlayed, highScores: state.highScores };
    case "DECREASE_TIME":
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case "RESET_TIME":
      return { ...state, timeRemaining: GAME_CONFIG.GAME_DURATION };
    case "SUBMIT_TRAY": {
      const selectedOrder = state.selectedOrder;
      const trayItems = state.trayItems;

      if (!selectedOrder) {
        return state;
      }

      if (selectedOrder?.items.length !== trayItems.length) {
        // Clear tray items, display wrong message
        return { ...state, trayItems: [] };
      }

      // Check to make sure all items are in
      const fulfillsOrder = selectedOrder?.items.every((item) => trayItems.includes(item));

      if (fulfillsOrder) {
        // Clears tray, adds points, removes order
        return {
          ...state,
          trayItems: [],
          currentScore: state.currentScore + selectedOrder.value,
          orders: state.orders.filter((order) => order.id !== selectedOrder.id),
        };
      } else {
        // Clear tray items, display wrong message
        return { ...state, trayItems: [] };
      }
    }
    case "REMOVE_FROM_TRAY":
      return { ...state, trayItems: state.trayItems.filter((_, idx) => idx !== action.payload.food_idx) };
    case "SELECT_ORDER":
      return { ...state, selectedOrder: action.payload };
    case "DECREASE_ORDER_TIME": {
      const expiredOrders = state.orders.filter((order) => order.timeRemaining - 1 <= 0);

      const penalty = expiredOrders.reduce(
        (acc, order) => acc + Math.floor(Math.random() * (order.value / 2 - order.value / 4) + order.value / 4),
        0
      );

      const updatedOrders = state.orders
        .map((order) => ({ ...order, timeRemaining: Math.max(0, order.timeRemaining - 1) }))
        .filter((order) => order.timeRemaining > 0);

      return {
        ...state,
        orders: updatedOrders,
        currentScore: Math.max(state.currentScore - penalty, 0),
      };
    }
    case "SET_HISTORICAL_DATA":
      return {
        ...state,
        highScores: action.payload.scores,
        gamesPlayed: action.payload.gamesPlayed,
      };
    case "TOGGLE_CHALLENGE_MODE":
      return { ...state, isChallenge: true, gameHasStarted: true };
    case "SET_CHALLENGE_ORDER":
      return { ...state, challengeOrder: action.payload };
    case "REDUCE_SCORE":
      return { ...state, currentScore: (state.currentScore -= action.payload) };
    default:
      throw new Error("Missing case");
  }
}
