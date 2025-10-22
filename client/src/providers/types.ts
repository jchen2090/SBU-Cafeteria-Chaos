import type { availableFoods } from "../utils/Foods";

export type OrderType = {
  id: string;
  items: Array<availableFoods>;
  timeRemaining: number;
  shelfLife: number;
  value: number;
  isChallenge: boolean;
  name?: string;
};

export type clearedOrderType = {
  order: OrderType;
  isCompleted: boolean;
  hasDisplayedToast: boolean;
  penalty: number;
};

export type GameConfigType = {
  GAME_DURATION: number;
  ORDER_SHELF_LIFE: number;
  DIFFICULTY: 1 | 2 | 3 | 4 | 5;
  MAX_ORDERS: number;
  FOOD_TRAY_POSITION: "TOP" | "BOTTOM";
  MAX_RECORDS: number;
};

export type GameStateType = {
  orders: Array<OrderType>;
  timeRemaining: number;
  gameHasStarted: boolean;
  trayItems: Array<availableFoods>;
  selectedOrder: OrderType | null;
  currentScore: number;
  highScores: Array<SavedGameType>;
  gamesPlayed: number;
  isChallenge: boolean;
  challengeOrder: OrderType | null;
  clearedOrders: Array<clearedOrderType>;
  config: GameConfigType;
  gameIsOver: boolean;
  ordersFulfilled: number;
  ordersLost: number;
  isDemoMode: boolean;
};

export type SavedGameType = {
  initials: string;
  score: number;
};

export type HistoricalDataType = {
  highScores: Array<SavedGameType>;
  gamesPlayed: number;
};
