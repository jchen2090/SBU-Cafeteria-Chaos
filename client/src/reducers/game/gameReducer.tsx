import { initialState } from "../../providers/GameStateProvider";
import type { GameStateType } from "../../providers/types";
import type { GlobalActions } from "./actions";

export function gameReducer(state: GameStateType, action: GlobalActions): GameStateType {
  switch (action.type) {
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "ADD_TO_TRAY":
      return { ...state, trayItems: [...state.trayItems, action.payload] };
    case "CLEAR_TRAY":
      return { ...state, trayItems: [] };
    case "START_GAME":
      return {
        ...initialState,
        gameHasStarted: true,
        gamesPlayed: state.gamesPlayed + 1,
        highScores: state.highScores,
      };
    case "STOP_GAME":
      return { ...state, gamesPlayed: state.gamesPlayed, highScores: state.highScores, gameIsOver: true };
    case "MAIN_MENU":
      return { ...initialState, gamesPlayed: state.gamesPlayed, highScores: state.highScores };
    case "DECREASE_TIME":
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
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
          clearedOrders: [
            ...state.clearedOrders,
            { order: selectedOrder, isCompleted: true, hasDisplayedToast: false },
          ],
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
        clearedOrders: [
          ...state.clearedOrders,
          ...expiredOrders.map((order) => ({ order: order, isCompleted: false, hasDisplayedToast: false })),
        ],
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
    case "REMOVE_FROM_CLEARED_ORDERS": {
      const orderToRemove = action.payload;
      const orderIsCompleted = orderToRemove.isCompleted;

      const updatedOrders = state.clearedOrders.filter((order) => order.order.id !== orderToRemove.order.id);

      if (orderIsCompleted) {
        return { ...state, clearedOrders: updatedOrders, ordersFulfilled: state.ordersFulfilled + 1 };
      } else {
        return { ...state, clearedOrders: updatedOrders, ordersLost: state.ordersLost + 1 };
      }
    }
    case "CHANGE_TRAY_POSITION":
      return { ...state, config: { ...state.config, FOOD_TRAY_POSITION: action.payload } };
    default:
      throw new Error("Missing case");
  }
}
