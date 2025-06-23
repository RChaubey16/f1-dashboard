import Image from "next/image";

type GrandPrixCardProps = {
  gpName: string;
  gpDate?: string;
  gpTime?: string;
};

const GrandPrixCard = ({
  gpName = "Austrian Grand Prix",
  gpDate = "June 27, 2025",
  gpTime = "09 days, 22 hours",
}: GrandPrixCardProps) => {
  return (
    <div className="grand-prix-card">
      <div className="flex flex-col gap-6 justify-between">
        <div className="space-y-1">
          <p className="title-text text-2xl">{gpName}</p>
          <p className="label-text text-sm">{gpDate}</p>
        </div>
        <p className="points-text">{gpTime}</p>
      </div>

      <div>
        <Image
          src={"/circuits/red-bull-ring.svg"}
          alt={`logo`}
          width={140}
          height={40}
        />
      </div>
      <div className="relative right-[-18]">
        <Image
          src={"/flags/austria-flag.png"}
          alt={`logo`}
          width={100}
          height={40}
        />
      </div>
    </div>
  );
};

export default GrandPrixCard;
