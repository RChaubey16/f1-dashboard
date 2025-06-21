const StandingsTable = () => {
  const data = [
    { position: 1, constructor: "McLaren Racing", points: 222 },
    { position: 2, constructor: "McLaren Racing", points: 222 },
    { position: 3, constructor: "McLaren Racing", points: 222 },
    { position: 4, constructor: "McLaren Racing", points: 222 },
    { position: 5, constructor: "McLaren Racing", points: 222 },
    { position: 6, constructor: "McLaren Racing", points: 222 },
    { position: 7, constructor: "McLaren Racing", points: 222 },
    { position: 8, constructor: "McLaren Racing", points: 222 },
    { position: 9, constructor: "McLaren Racing", points: 222 },
    { position: 10, constructor: "McLaren Racing", points: 222 },
  ];

  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="table-heading-text bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-2 py-3 text-left">Constructor</th>
            <th className="px-6 py-3 text-right">Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.position}
              className="table-data-text border-b border-half-baked hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{row.position}</td>
              <td className="px-2 py-3 whitespace-nowrap">{row.constructor}</td>
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
