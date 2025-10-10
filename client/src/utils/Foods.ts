import { GAME_CONFIG } from "../providers/GameStateProvider";
import type { OrderType } from "../providers/types";

const FOOD_ITEMS = {
  burger: { imagePath: "images/burger.png", emoji: "🍔" },
  pizza: { imagePath: "images/pizza.png", emoji: "🍕" },
  fries: { imagePath: "images/fries.png", emoji: "🍟" },
  hotdog: { imagePath: "images/hotdog.png", emoji: "🌭" },
  taco: { imagePath: "images/taco.png", emoji: "🌮" },
  soda: { imagePath: "images/soda.png", emoji: "🥤" },
  donut: { imagePath: "images/donut.png", emoji: "🍩" },
  coffee: { imagePath: "images/coffee.png", emoji: "☕" },
  sushi: { imagePath: "images/sushi.png", emoji: "🍣" },
} as const;

export type availableFoods = keyof typeof FOOD_ITEMS;

export const getFoodEmoji = (food: availableFoods) => {
  if (!(food in FOOD_ITEMS)) {
    throw new Error("Valid food parameter");
  }

  return FOOD_ITEMS[food].emoji;
};

export const getAllFoods = () => {
  return Object.keys(FOOD_ITEMS) as availableFoods[];
};

const generateRandomFoodOrder = () => {
  const randomQty = Math.floor(Math.random() * 4 + 1);
  const items = [];
  const availableFoods = getAllFoods();

  for (let i = 0; i < randomQty; i++) {
    const randomIdx = Math.floor(Math.random() * availableFoods.length);
    const foodToAdd = availableFoods[randomIdx];
    items.push(foodToAdd);
  }
  return items as availableFoods[];
};

export const generateRandomOrder = () => {
  const id = `order-${Date.now()}`;
  const items = generateRandomFoodOrder();
  const timeRemaining = GAME_CONFIG.ORDER_SHELF_LIFE;
  const shelfLife = GAME_CONFIG.ORDER_SHELF_LIFE;
  const value = items.length * 25;
  const isChallenge = false;

  const order: OrderType = {
    id,
    items,
    timeRemaining,
    shelfLife,
    value,
    isChallenge,
  };

  return order;
};
