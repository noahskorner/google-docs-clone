const Table = () => {
  return (
    <table className="w-full text-left table-auto border border-primary rounded-xl">
      <thead className="bg-gray-100 text-gray-500 dark:text-gray-300 uppercase text-sm dark:bg-gray-800 font-medium">
        <tr className="rounded-md">
          <th className="border border-primary">Company</th>
          <th className="border border-primary">Company</th>
          <th className="border border-primary">Company</th>
          <th className="border border-primary">Company</th>
          <th className="border border-primary">Company</th>
          <th className="border border-primary">Company</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
        </tr>
        <tr>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
          <td className="border border-primary">Alfreds Futterkiste</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
