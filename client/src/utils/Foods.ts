import type { OrderType } from "../providers/types";

const FOOD_ITEMS = {
  burger: { imagePath: "images/burger.png", emoji: "🍗" },
  pizza: { imagePath: "images/pizza.png", emoji: "🥛" },
  fries: { imagePath: "images/fries.png", emoji: "🍪" },
  hotdog: { imagePath: "images/hotdog.png", emoji: "🎄" },
  taco: { imagePath: "images/taco.png", emoji: "❄️" },
  soda: { imagePath: "images/soda.png", emoji: "🍬" },
  donut: { imagePath: "images/donut.png", emoji: "☃️" },
  coffee: { imagePath: "images/coffee.png", emoji: "🎁" },
  sushi: { imagePath: "images/sushi.png", emoji: "🥧" },
} as const;

const DAILY_CHALLENGE_NAMES = [
  "The Year End Fuel-Up",
  "Study Hall Snack Blizzard",
  "Professor’s Peppermint Pick",
  "The Festive List Delight",
  "The Midnight Sleigh Ride",
  "Holiday Season Grub",
];

const POSITIVE_FEEDBACK = [
  "Just what I needed for the holidays!",
  "Jolly and delicious!",
  "Festively tasty!",
  "Perfect—like a wrapped gift!",
  "My seasonal favorite!",
  "So fast—faster than a winter sleigh!",
  "Amazing holiday service!",
  "You're a winter star!",
  "Yummy and merry!",
  "Five festive stars!",
  "Absolutely excellent—ho ho ho!",
];

const NEGATIVE_FEEDBACK = [
  "Is this what I put on my wish list?",
  "Hmm, not quite holiday-right.",
  "Where's the rest of the festive treats?",
  "I've been waiting longer than the seasonal list!",
  "This is… *festively* creative.",
  "My order must be lost in the snow.",
  "Did someone forget something?",
  "Not worth the holiday wait.",
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

export const generateRandomOrder = (orderShelfLife: number, orderId?: string) => {
  const id = orderId ? orderId : `order-${Date.now()}`;
  const items = generateRandomFoodOrder(false);
  const timeRemaining = orderShelfLife;
  const shelfLife = orderShelfLife;
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

export const generateSpecialOrder = (orderShelfLife: number) => {
  const id = `speical-order`;
  const name = getRandomDailyName();
  const items = generateRandomFoodOrder(true);
  const timeRemaining = orderShelfLife;
  const shelfLife = orderShelfLife;
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
