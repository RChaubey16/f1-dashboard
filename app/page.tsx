import StatsCard from "@/components/StatsCard";
import GrandPrixCard from "@/components/GrandPrixCard";
import StandingsTable from "@/components/StandingsTable";
import Tabs from "@/components/TabComponent";

export default async function Home() {
  const tabItems = [
    { label: "Constructors", content: <StandingsTable /> },
    { label: "Drivers", content: <StandingsTable /> },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 ">
        <StatsCard
          cardLabel="Leading Constructor"
          cardTitle="McLaren Racing"
          points={204}
          logo="/teams/mclaren-logo.svg"
          logoType="team"
        />
        <StatsCard
          cardLabel="Leading Driver"
          cardTitle="Max Verstappen"
          points={204}
          logo="/drivers/max-verstappen.svg"
          logoType="driver"
        />
      </div>

      <div className="w-[665px]">
        <GrandPrixCard
          gpName="Austrian Grand Prix"
          gpDate="May 26, 2025"
          gpTime="5 days, 12 hours"
        />
        <Tabs tabs={tabItems} />
      </div>
    </>
  );
}
