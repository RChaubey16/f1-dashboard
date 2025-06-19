import LogoBox from "./LogoBox";

const StatsCard = () => {
  return (
    <div className="border border-red-500 w-fit p-4 flex items-center gap-5 rounded-lg">
      <div className="border border-blue-500 space-y-5">
        <div className="space-y-1">
          {/* Label */}
          <p>Leading Constructor</p>
          {/* Title */}
          <p>McLaren Racing</p>
        </div>
        {/* Value */}
        <p>204 Pts</p>
      </div>
      <div>
        <LogoBox />
      </div>
    </div>
  );
};

export default StatsCard;
