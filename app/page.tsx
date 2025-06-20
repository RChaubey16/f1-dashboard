import StatsCard from "@/components/StatsCard";

export default async function Home() {
  return (
    <>
      <StatsCard
        cardLabel="Leading Constructor"
        cardTitle="McLaren Racing"
        points={204}
        logo="/teams/mclaren-logo.svg"
        logoType="team"
      />
      <StatsCard
        cardLabel="Leading Constructor"
        cardTitle="McLaren Racing"
        points={204}
        logo="/drivers/max-verstappen.svg"
        logoType="driver"
      />
    </>
  );
}
