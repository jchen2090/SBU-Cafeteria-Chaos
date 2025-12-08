/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import type { GameConfigType, GameStateType } from "./types";
import type { GlobalActions } from "../reducers/game/actions";
import { gameReducer } from "../reducers/game/gameReducer";
import { getHistoricalData } from "../utils/Scores";
import { generateRandomOrder } from "../utils/Foods";

const GAME_CONFIG: GameConfigType = {
  GAME_DURATION: 60,
  ORDER_SHELF_LIFE: 20,
  DIFFICULTY: 2,
  MAX_ORDERS: 7,
  FOOD_TRAY_POSITION: "BOTTOM",
  MAX_RECORDS: 10,
};

export const initialState: GameStateType = {
  orders: [
    generateRandomOrder(GAME_CONFIG.ORDER_SHELF_LIFE, "order-1"),
    generateRandomOrder(GAME_CONFIG.ORDER_SHELF_LIFE, "order-2"),
    generateRandomOrder(GAME_CONFIG.ORDER_SHELF_LIFE, "order-3"),
  ],
  timeRemaining: GAME_CONFIG.GAME_DURATION,
  trayItems: [],
  selectedOrder: null,
  currentScore: 0,
  highScores: [],
  gamesPlayed: 0,
  pastSemesters: [],
  isChallenge: false,
  challengeOrder: null,
  clearedOrders: [],
  currentSemester: "DID NOT READ PROPERLY",
  config: GAME_CONFIG,
  ordersFulfilled: 0,
  ordersLost: 0,
  screen: "START",
};

interface contextType {
  state: GameStateType;
  dispatch: Dispatch<GlobalActions>;
}
export const GlobalStateContext = createContext<contextType | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const res = await getHistoricalData();
        dispatch({
          type: "SET_HISTORICAL_DATA",
          payload: {
            scores: res.highScores,
            gamesPlayed: res.gamesPlayed,
            pastSemesters: res.pastSemesters,
            currentSemester: res.currentSemester,
          },
        });
      } catch (err) {
        console.error("Failed to load initial state:", err);
      }
    };

    loadHistoricalData();
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGameContext must be wrapped around GameStateProvider");
  }
  return context;
}
