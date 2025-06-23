import {
  getConstructorStandings,
  getDriverStandings,
  getFastestLaps,
  getRaceResults,
  getRaceSchedule,
} from "f1-api-node";
import data from "./data.json";

/**
 * Gets the World Champion driver for the specified year
 * @param year - The year to get the champion for (defaults to 2024)
 * @returns The driver standing at position 1
 */
export const getWorldChampion = async (year = 2024) => {
  const driverStandings = await getDriverStandings(year);
  const driver = driverStandings[0];
  const driverName = driver.driver.trim().slice(0, -3) ?? "";
  const driverRaceId = driver.driver.trim().slice(-3) ?? "";

  return {
    ...driver,
    driver: driverName,
    avatar:
      data.drivers[driverRaceId as keyof typeof data.drivers].avatar ?? "",
    logoType: "driver",
  };
};

/**
 * Gets the Constructor Champion for the specified year
 * @param year - The year to get the champion for (defaults to 2024)
 * @returns The constructor standing at position 1
 */
export const getConstructorChampion = async (year = 2024) => {
  const constructorStandings = await getConstructorStandings(year);
  const constructor = constructorStandings[0];

  return {
    ...constructor,
    logo: data.teams[constructor.team.toLowerCase() as keyof typeof data.teams]
      .logo,
    logoType: "team",
  };
};

/**
 * Gets the winner of the most recent race for the specified year
 * @param year - The year to get results from (defaults to 2025)
 * @returns The last race result from the season
 */
export const getLatestRaceWinner = async (year = 2025) => {
  const raceResults = await getRaceResults(year);
  return raceResults[raceResults.length - 1];
};

/**
 * Gets the upcoming race from the schedule
 * @param year - The year to get schedule from (defaults to 2025)
 * @returns The next scheduled race
 * @todo Fix API integration - current implementation may not work as expected
 */
export const getNextRace = async (year = 2025) => {
  return await getRaceSchedule(year);
};

/**
 * Gets the fastest lap from the most recent race
 * @param year - The year to get fastest laps from (defaults to 2025)
 * @returns The most recent fastest lap
 */
export const getLastFastestLap = async (year = 2025) => {
  const fastestLaps = await getFastestLaps(year);
  const driver = fastestLaps[fastestLaps.length - 1];
  const driverName = driver.driver.trim().slice(0, -3) ?? "";
  const driverRaceId = driver.driver.trim().slice(-3) ?? "";

  return {
    ...driver,
    driver: driverName,
    avatar:
      data.drivers[driverRaceId as keyof typeof data.drivers].avatar ?? "",
    logoType: "driver",
  };
};
