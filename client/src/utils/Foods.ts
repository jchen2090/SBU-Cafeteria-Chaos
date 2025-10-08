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
