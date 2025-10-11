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
};

export type SavedGameType = {
  initials: string;
  score: number;
};

export type HistoricalDataType = {
  highScores: Array<SavedGameType>;
  gamesPlayed: number;
};
