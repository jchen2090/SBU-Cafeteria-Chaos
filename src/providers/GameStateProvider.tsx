/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import type { GameStateType } from "./types";
import type { GlobalActions } from "../reducers/game/actions";
import { gameReducer } from "../reducers/game/gameReducer";

const initialState: GameStateType = {
  orders: [
    {
      id: "t1",
      items: ["burger", "pizza"],
      timeRemaining: 20,
      shelfLife: 20,
      value: 25,
      isChallenge: false,
      name: "test",
    },
  ],
  timeRemaining: 10,
  gameHasStarted: false,
  GAME_DURATION: 60,
  trayItems: [],
  selectedOrder: null,
  currentScore: 0,
};

interface contextType {
  state: GameStateType;
  dispatch: Dispatch<GlobalActions>;
}
export const GlobalStateContext = createContext<contextType | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
