import { createContext, useState, useEffect } from "react";
import * as d3 from "d3";

const SmallDataContext = createContext(null);

export const SmallDataProvider = ({ children }) => {
  const [smallCsv, setSmallCsv] = useState(null);

  useEffect(() => {
    fetch("./kleineDataset.csv")
      .then((response) => response.text())
      .then((data, rows, headers, i) => {
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
        data = d3.shuffle(data);
        let filteredData = []
        for (i = 0; i < 2500; i++) {
          filteredData.push(data[i]);
        }
        setSmallCsv(filteredData);
      })
  }, []);
  return <SmallDataContext.Provider value={smallCsv}>{children}</SmallDataContext.Provider>;
};

export default SmallDataContext;
