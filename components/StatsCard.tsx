import LogoBox from "./LogoBox";

type StatsCardProps = {
  cardLabel: string;
  cardTitle: string;
  points: number;
  logo: string;
  logoType: string;
};

const StatsCard = ({ cardLabel, cardTitle, points, logo, logoType }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="space-y-5">
        <div className="space-y-1">
          <p className="label-text">{cardLabel}</p>
          <p className="title-text">{cardTitle}</p>
        </div>
        <p className="points-text">{points} Pts</p>
      </div>

      <LogoBox logo={logo} logoAltText={cardTitle} />
    </div>
  );
};

export default StatsCard;
