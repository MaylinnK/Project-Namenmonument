import { createContext, useState, useEffect } from "react";
import * as d3 from "d3";

const BigDataContext = createContext(null);

export const BigDataProvider = ({ children }) => {
  const [bigCsv, setBigCsv] = useState(null);

  useEffect(() => {
    fetch("./groteDataset.csv")
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
        for (i = 0; i < 500; i++) {
          filteredData.push(data[i]);
        }
        setBigCsv(filteredData);
      })
  }, []);
  return <BigDataContext.Provider value={bigCsv}>{children}</BigDataContext.Provider>;
};

export default BigDataContext;
