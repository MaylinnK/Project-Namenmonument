import { createContext, useState, useEffect } from "react";

const SmallDataContext = createContext(null);

export const SmallDataProvider = ({ children }) => {
  const [smallCsv, setSmallCsv] = useState(null);

  useEffect(() => {
    fetch("./kleineDataset.csv")
      .then((response) => response.text())
      .then((data, rows, headers) => {
        headers = data.slice(0, data.indexOf("\n")).split(";");
        rows = data.slice(data.indexOf("\n") + 1).split("\n");
        data = rows.map(function (row) {
          const values = row.split(";");
          const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
          }, {});
          return el;
        });
        setSmallCsv(data);
      })
  }, []);
  return <SmallDataContext.Provider value={smallCsv}>{children}</SmallDataContext.Provider>;
};

export default SmallDataContext;
