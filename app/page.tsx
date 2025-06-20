import StatsCard from "@/components/StatsCard";

export default async function Home() {
  return (
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
  );
}
