import { initialState } from "../providers/GameStateProvider";
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

const DAILY_CHALLENGE_NAMES = [
  "The Final Exam Fuel-Up",
  "Study Hall Snack Attack",
  "Professor's Pick",
  "Dean's List Delight",
  "The All-Nighter",
  "Graduation Grub",
];

const POSITIVE_FEEDBACK = [
  "Just what I needed!",
  "Wolfylicious!",
  "Delicious!",
  "Perfect!",
  "My favorite!",
  "So fast!",
  "Amazing service!",
  "You're a star!",
  "Yummy!",
  "Five stars!",
  "Excellent!",
];

const NEGATIVE_FEEDBACK = [
  "Is this what I ordered?",
  "Hmm, not quite right.",
  "Where's the rest of it?",
  "I've been waiting forever!",
  "This is... creative.",
  "My order must be lost.",
  "Did you forget something?",
  "This wasn't worth the wait.",
];

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

const generateRandomFoodOrder = (isSpeical: boolean) => {
  let randomQty;
  if (!isSpeical) {
    randomQty = Math.floor(Math.random() * 4 + 1);
  } else {
    randomQty = 5;
  }
  const items = [];
  const availableFoods = getAllFoods();

  for (let i = 0; i < randomQty; i++) {
    const randomIdx = Math.floor(Math.random() * availableFoods.length);
    const foodToAdd = availableFoods[randomIdx];
    items.push(foodToAdd);
  }
  return items as availableFoods[];
};

const getRandomDailyName = () => {
  const randomidx = Math.floor(Math.random() * DAILY_CHALLENGE_NAMES.length);
  return DAILY_CHALLENGE_NAMES[randomidx];
};

export const generateRandomOrder = () => {
  const id = `order-${Date.now()}`;
  const items = generateRandomFoodOrder(false);
  const timeRemaining = initialState.config.ORDER_SHELF_LIFE;
  const shelfLife = initialState.config.ORDER_SHELF_LIFE;
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

export const generateSpecialOrder = () => {
  const id = `speical-order`;
  const name = getRandomDailyName();
  const items = generateRandomFoodOrder(true);
  const timeRemaining = initialState.config.ORDER_SHELF_LIFE;
  const shelfLife = initialState.config.ORDER_SHELF_LIFE;
  const value = 250;
  const isChallenge = true;

  const order: OrderType = {
    id,
    items,
    timeRemaining,
    shelfLife,
    value,
    isChallenge,
    name,
  };
  return order;
};

export const getRandomPositiveMessage = () => {
  const idx = Math.floor(Math.random() * POSITIVE_FEEDBACK.length);
  return POSITIVE_FEEDBACK[idx];
};

export const getRandomNegativeMessage = () => {
  const idx = Math.floor(Math.random() * NEGATIVE_FEEDBACK.length);
  return NEGATIVE_FEEDBACK[idx];
};
