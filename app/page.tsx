import StatsCard from "@/components/StatsCard";
import GrandPrixCard from "@/components/GrandPrixCard";
import StandingsTable from "@/components/StandingsTable";
import Tabs from "@/components/TabComponent";
import {
  getConstructorChampion,
  getLastFastestLap,
  getNextRace,
  getSeasonCompletionPercentage,
  getWorldChampion,
} from "@/utils/helpers";

export default async function Home() {
  const tabItems = [
    {
      label: "Constructors",
      content: <StandingsTable standingsType="Constructor" />,
    },
    { label: "Drivers", content: <StandingsTable standingsType="Driver" /> },
  ];

  const leadingConstructor = await getConstructorChampion(2025);
  const reigningConstructor = await getConstructorChampion(2024);
  const leadingDriver = await getWorldChampion(2025);
  const reigningDriver = await getWorldChampion(2024);
  const fastestLap = await getLastFastestLap(2025);
  const nextRace = await getNextRace(2025);
  const currentSeasonCompletion = await getSeasonCompletionPercentage(2025);

  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4">
      {/* Left Column */}
      <aside className="p-4 space-y-7.5 order-2 lg:order-1">
        <StatsCard
          cardLabel="Leading Constructor"
          cardTitle={leadingConstructor.team}
          points={`${leadingConstructor.points} Pts`}
          logo={leadingConstructor.logo ?? ""}
          logoType={leadingConstructor.logoType}
        />
        <StatsCard
          cardLabel="Reigning Constructor"
          cardTitle={reigningConstructor.team}
          points={`${reigningConstructor.points} Pts`}
          logo={reigningConstructor.logo ?? ""}
          logoType={reigningConstructor.logoType}
        />
      </aside> 

      {/* Middle Column */}
      <div className="p-4 space-y-7.5 order-1 lg:order-2">
        <GrandPrixCard
          gpName={nextRace?.gpName}
          gpDate={nextRace?.gpDate}
          gpTime={nextRace?.gpTimeLeft}
        />

        <div className="p-5 bg-white rounded-[10px]">
          <h3 className="title-table">Leaderboard</h3>
          <Tabs tabs={tabItems} />
        </div>
      </div>

      {/* Right Column */}
      <aside className="p-4 space-y-7.5 order-3 lg:order-3">
        <StatsCard
          cardLabel="Leading Driver"
          cardTitle={leadingDriver.driver}
          points={`${leadingDriver.points} Pts`}
          logo={leadingDriver.avatar}
          logoType={leadingDriver.logoType}
        />
        <StatsCard
          cardLabel="Reigning Driver"
          cardTitle={reigningDriver.driver}
          points={`${reigningDriver.points} Pts`}
          logo={reigningDriver.avatar}
          logoType={reigningDriver.logoType}
        />
        <StatsCard
          cardLabel="Last Fastest Lap"
          cardTitle={fastestLap.driver}
          points={fastestLap.time}
          logo={fastestLap.avatar}
          logoType={leadingDriver.logoType}
        />
      </aside>
    </div>
  );
}
