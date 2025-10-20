import { initialState } from "../../providers/GameStateProvider";
import type { GameStateType } from "../../providers/types";
import type { GlobalActions } from "./actions";

export function gameReducer(state: GameStateType, action: GlobalActions): GameStateType {
  switch (action.type) {
    case "ADD_ORDER": {
      console.log(`adding order to order state: ${JSON.stringify(action.payload, null, 4)}`);
      return { ...state, orders: [...state.orders, action.payload] };
    }
    case "ADD_TO_TRAY": {
      console.log(`adding food to tray: ${action.payload}`);
      return { ...state, trayItems: [...state.trayItems, action.payload] };
    }
    case "CLEAR_TRAY": {
      console.log("clearing tray");
      return { ...state, trayItems: [] };
    }
    // FIXME: I don't like this... create a separate action to reset the state
    case "START_GAME": {
      console.log("starting game");
      return {
        ...initialState,
        config: {
          ...state.config,
          DIFFICULTY: initialState.config.DIFFICULTY,
          ORDER_SHELF_LIFE: initialState.config.ORDER_SHELF_LIFE,
        },
        screen: "GAME",
        gamesPlayed: state.gamesPlayed + 1,
        highScores: state.highScores,
      };
    }
    case "STOP_GAME": {
      console.log("stopping game");
      return { ...state, gamesPlayed: state.gamesPlayed, highScores: state.highScores, screen: "END" };
    }
    case "MAIN_MENU":
      console.log("returning to main menu");
      return { ...initialState, gamesPlayed: state.gamesPlayed, highScores: state.highScores };
    case "DECREASE_TIME":
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case "SUBMIT_TRAY": {
      const selectedOrder = state.selectedOrder;
      const trayItems = state.trayItems;

      if (!selectedOrder) {
        console.log("no order selected, cannot submit");
        return state;
      }

      // FIXME: Is this even necessary?
      if (selectedOrder?.items.length !== trayItems.length) {
        // Clear tray items, display wrong message
        console.log("order items and tray items are different amounts, do not submit");
        return { ...state, trayItems: [] };
      }

      // Check to make sure all items are in
      const fulfillsOrder = selectedOrder?.items.every((item) => trayItems.includes(item));

      if (fulfillsOrder) {
        // Clears tray, adds points, removes order
        console.log("successfully fulfilled order");
        return {
          ...state,
          trayItems: [],
          currentScore: state.currentScore + selectedOrder.value,
          orders: state.orders.filter((order) => order.id !== selectedOrder.id),
          clearedOrders: [
            ...state.clearedOrders,
            { order: selectedOrder, isCompleted: true, hasDisplayedToast: false, penalty: selectedOrder.value },
          ],
        };
      } else {
        // Clear tray items, display wrong message
        return { ...state, trayItems: [] };
      }
    }
    case "REMOVE_FROM_TRAY": {
      console.log(`removing food from tray: ${state.trayItems[action.payload.food_idx]}`);
      return { ...state, trayItems: state.trayItems.filter((_, idx) => idx !== action.payload.food_idx) };
    }
    case "SELECT_ORDER": {
      console.log(`selected order: ${action.payload}`);
      return { ...state, selectedOrder: action.payload };
    }
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
          ...expiredOrders.map((order) => ({
            order: order,
            isCompleted: false,
            hasDisplayedToast: false,
            penalty: -penalty,
          })),
        ],
      };
    }
    case "SET_HISTORICAL_DATA": {
      console.log(`set state to contain historical data: ${action.payload}`);
      return {
        ...state,
        highScores: action.payload.scores,
        gamesPlayed: action.payload.gamesPlayed,
      };
    }
    case "TOGGLE_CHALLENGE_MODE": {
      console.log("challenge mode is turned on");
      return { ...state, isChallenge: true, screen: "GAME" };
    }
    case "SET_CHALLENGE_ORDER": {
      console.log(`created challenge order: ${action.payload}`);
      return { ...state, challengeOrder: action.payload };
    }
    case "REMOVE_FROM_CLEARED_ORDERS": {
      const orderToRemove = action.payload;
      const orderIsCompleted = orderToRemove.isCompleted;

      const updatedOrders = state.clearedOrders.filter((order) => order.order.id !== orderToRemove.order.id);

      if (orderIsCompleted) {
        console.log("updated fulfilled orders amt");
        return { ...state, clearedOrders: updatedOrders, ordersFulfilled: state.ordersFulfilled + 1 };
      } else {
        console.log("updated lost orders amt");
        return { ...state, clearedOrders: updatedOrders, ordersLost: state.ordersLost + 1 };
      }
    }
    case "CHANGE_TRAY_POSITION": {
      console.log(`successfully changed tray position to ${action.payload}`);
      return { ...state, config: { ...state.config, FOOD_TRAY_POSITION: action.payload } };
    }
    case "TOGGLE_DEMO_MODE": {
      console.log("demo mode is turned on");
      return { ...state, screen: "DEMO" };
    }
    case "INCREASE_DIFFICULTY": {
      console.log("Increasing difficulty");

      const updatedDifficulty = Math.min(5, state.config.DIFFICULTY + 1) as 1 | 2 | 3 | 4 | 5;
      const updatedOrderShelfLife = initialState.config.ORDER_SHELF_LIFE - (updatedDifficulty - 1) * 3;

      return {
        ...state,
        config: { ...state.config, DIFFICULTY: updatedDifficulty, ORDER_SHELF_LIFE: updatedOrderShelfLife },
      };
    }
    case "CHANGE_SCREEN": {
      console.log("changing screen");

      return {
        ...state,
        screen: action.payload,
      };
    }
    default:
      throw new Error("Missing case");
  }
}
