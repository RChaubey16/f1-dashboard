import { getStandings } from "@/utils/helpers";

const StandingsTable = async ({ standingsType = "Driver" }) => {
  const standings = await getStandings(2025, standingsType)

  return (
    <div className="w-full h-[590px] overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="table-heading-text bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-2 py-3 text-left">{standingsType}</th>
            <th className="px-6 py-3 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr
              key={row.position}
              className="table-data-text border-b border-card-border-color hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{row.position}</td>
              <td className="px-2 py-3 whitespace-nowrap">
                {standingsType.toLowerCase() === "constructor"
                  ? row.team
                  : "driver" in row && typeof row.driver === "string"
                    ? row.driver.trim().slice(0, -3)
                    : ""}
              </td>
              <td className="px-6 py-3 text-right font-semibold">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
