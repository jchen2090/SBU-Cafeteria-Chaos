import type { HistoricalDataType } from "../providers/types";

export const getHistoricalData = async () => {
  const response = await fetch("/api/scores");

  if (response.ok) {
    const data: HistoricalDataType = await response.json();

    // Sort in descending order so first item is the highest
    data.highScores.sort((a, b) => b.score - a.score);

    return data;
  } else {
    return { highScores: [], gamesPlayed: 0 };
  }
};

export const saveToFile = async (dataToSave: HistoricalDataType) => {
  try {
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });

    if (!response.ok) {
      throw new Error("Error writing data to file");
    }
  } catch (err) {
    console.error(err);
  }
};
