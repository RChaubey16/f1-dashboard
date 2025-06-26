import {
  getConstructorStandings,
  getDriverStandings,
  getFastestLaps,
  getRaceResults,
} from "f1-api-node";
import {
  formatReadableDate,
  getDriveName,
  getHighestScoringRacer,
} from "./utilityFunctions";
import data from "./data.json";

/**
 * Gets the World Champion driver for the specified year
 * @param year - The year to get the champion for (defaults to 2024)
 * @returns The driver standing at position 1
 */
export const getWorldChampion = async (year = 2024) => {
  const driverStandings = await getDriverStandings(year);
  const driver = driverStandings[0];
  const { name, raceId } = getDriveName(driver.driver);

  return {
    ...driver,
    driver: name,
    avatar: data.drivers[raceId as keyof typeof data.drivers].avatar ?? "",
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

  // Adding this statement due to inconsistency in team names from API.
  if (constructor.team.toLowerCase() === "mclaren mercedes") {
    constructor.team = "McLaren";
    return {
      ...constructor,
      logo: data.teams[
        constructor.team.toLowerCase() as keyof typeof data.teams
      ].logo,
      logoType: "team",
    };
  }

  return {
    ...constructor,
    logo: data.teams[constructor.team.toLowerCase() as keyof typeof data.teams]
      .logo,
    logoType: "team",
  };
};

/**
 * Fetches race results for a given year from the Ergast API
 * @param year - The year to fetch race results for
 * @returns An array of race results
 */
const getRacesForAGivenYear = async (year: number) => {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/races`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch race results: ${response.statusText}`);
    }

    const data = await response.json();

    // You can adjust the path based on the actual API structure
    const races = data?.MRData?.RaceTable?.Races;

    if (!Array.isArray(races)) {
      throw new Error("Unexpected API response structure");
    }

    return races;
  } catch (error) {
    console.error("Error fetching race results:", error);
    return [];
  }
};

/**
 * Formats the time difference from now to the race date in "DD days, HH hours"
 * @param raceDateTime - The Date object representing the race date and time
 */
const getTimeLeft = (raceDateTime: Date): string => {
  const now = new Date();
  const diffMs = raceDateTime.getTime() - now.getTime();

  if (diffMs <= 0) return "Race already occurred";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  return `${String(days).padStart(2, "0")} days, ${String(hours).padStart(
    2,
    "0"
  )} hours`;
};

/**
 * Gets the next upcoming Formula 1 Grand Prix for the specified year.
 * Filters out past races, identifies the closest future race, and returns
 * its name, formatted date, and time remaining until it starts.
 *
 * @param year - The year to get races from (defaults to 2025)
 * @returns An object containing:
 *  - gpName: the name of the next Grand Prix
 *  - gpDate: the race date in "Month Day, Year" format
 *  - gpTimeLeft: time left until race in "DD days, HH hours" format
 */
export const getNextRace = async (year = 2025) => {
  const raceResults = await getRacesForAGivenYear(year);
  const now = new Date();

  const futureRaces = raceResults
    .map((race) => {
      const dateStr = race.date.replace(/\//g, "-");
      const dateTimeStr = `${dateStr}T${race.time}`;
      const raceDateTime = new Date(dateTimeStr);
      return { ...race, raceDateTime };
    })
    .filter((race) => race.raceDateTime > now)
    .sort((a, b) => a.raceDateTime.getTime() - b.raceDateTime.getTime());

  if (futureRaces.length === 0) {
    console.log("No upcoming races");
    return null;
  }

  const nextRace = futureRaces[0];
  const timeLeft = getTimeLeft(nextRace.raceDateTime);
  const formattedDate = formatReadableDate(nextRace.raceDateTime);

  return {
    gpName: nextRace.raceName,
    gpDate: formattedDate,
    gpTimeLeft: timeLeft,
  };
};

/**
 * Gets the fastest lap from the most recent race
 * @param year - The year to get fastest laps from (defaults to 2025)
 * @returns The most recent fastest lap
 */
export const getLastFastestLap = async (year = 2025) => {
  const fastestLaps = await getFastestLaps(year);

  if (!Array.isArray(fastestLaps) || fastestLaps.length === 0) return null;
  const fastestLapDriver = fastestLaps.reduce((min, obj) => {
    return obj["time"] < min["time"] ? obj : min;
  });

  const { name, raceId } = getDriveName(fastestLapDriver.driver);

  return {
    ...fastestLapDriver,
    driver: name,
    avatar: data.drivers[raceId as keyof typeof data.drivers].avatar ?? "",
    logoType: "driver",
  };
};

/**
 * Retrieves the championship standings for a given year.
 * @param year - The season year to retrieve standings for (defaults to 2025).
 * @param type - The type of standings to retrieve: "Driver" or "Constructor" (defaults to "Constructor").
 * @returns The standings data for the specified year and type.
 */
export const getStandings = async (year = 2025, type = "Constructor") => {
  const standings =
    type.toLowerCase() === "constructor"
      ? await getConstructorStandings(year)
      : await getDriverStandings(year);
  return standings;
};

/**
 * Calculates how much of the F1 season has been completed based on today's date.
 *
 * @param year - The year of the season (defaults to 2025)
 * @returns A number representing the season completion percentage (0–100)
 */
export const getSeasonCompletionPercentage = async (
  year = 2025
): Promise<number> => {
  const races = await getRacesForAGivenYear(year);
  const now = new Date();

  // Parse and count completed races
  const completedRaces = races.filter((race) => {
    const dateStr = race.date.replace(/\//g, "-"); // Convert to YYYY-MM-DD
    const raceDateTime = new Date(`${dateStr}T${race.time}`);
    return raceDateTime < now;
  });

  const totalRaces = races.length;
  const done = completedRaces.length;

  if (totalRaces === 0) return 0;

  const percentage = (done / totalRaces) * 100;

  return Math.floor(percentage); // Optional: round down to whole number
};

type HighestScoringRacerResult = {
  winner: string;
  totalWins: number;
};

/**
 * Retrieves the race results for a given year and determines the driver with the most race wins.
 *
 * @param year - The season year to fetch race results for (defaults to 2025).
 * @returns An object containing the name of the top driver (`winner`) and a count of all their winning races (`totalWins`).
 */
export const getMostRaceWins = async (
  year = 2025
): Promise<HighestScoringRacerResult> => {
  try {
    const raceResults = await getRaceResults(year);
    return getHighestScoringRacer(raceResults);
  } catch (error) {
    console.error(`Failed to get most race wins for ${year}:`, error);
    return {
      winner: "",
      totalWins: 0,
    };
  }
};

export const getLastRaceStandings = async (year = 2025) => {
  const url = `https://api.jolpi.ca/ergast/f1/${year}/results`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch race results: ${response.statusText}`);
    }

    const data = await response.json();

    // You can adjust the path based on the actual API structure
    const races = data?.MRData?.RaceTable?.Races;

    console.log(`RACESSS`, races);

    if (!Array.isArray(races)) {
      throw new Error("Unexpected API response structure");
    }

    return races;
  } catch (error) {
    console.error("Error fetching race results:", error);
    return [];
  }
};
