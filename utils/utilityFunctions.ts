/**
 * Extracts the driver's name and race ID from a single string.
 *
 * @param driverName - A string combining the driver's name and their race ID (e.g., "LewisHamilton001").
 * @returns An object with `name` (the driver's name) and `raceId` (the last 3 characters of the input).
 */
export const getDriveName = (driverName = "") => {
  return {
    name: driverName.trim().slice(0, -3) ?? "",
    raceId: driverName.trim().slice(-3) ?? "",
  };
};

type RaceResult = {
  winner: string;
};

/**
 * Determines the driver with the most race wins using the Boyer–Moore majority vote algorithm.
 *
 * @param raceResults - An array of race results, each containing a `winner` string combining the name and race ID.
 * @returns The name of the driver with the highest number of wins.
 */
export const getHighestScoringRacer = (
  raceResults: RaceResult[] = []
): string => {
  if (raceResults.length === 0) return "";

  const firstDriver = getDriveName(raceResults[0].winner);
  let winner = firstDriver.name;
  let winnerRaceId = firstDriver.raceId;
  let winCount = 1;

  for (let i = 1; i < raceResults.length; i++) {
    const { name, raceId } = getDriveName(raceResults[i].winner);

    if (raceId === winnerRaceId) {
      winCount += 1;
    } else {
      winCount -= 1;
    }

    if (winCount <= 0) {
      winner = name;
      winnerRaceId = raceId;
      winCount = 1;
    }
  }

  return winner;
};
