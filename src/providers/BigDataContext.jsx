import { createContext, useState, useEffect } from "react";

const BigDataContext = createContext(null);

export const BigDataProvider = ({ children }) => {
  const [bigCsv, setBigCsv] = useState(null);

  useEffect(() => {
    fetch("./groteDataset.csv")
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
        setBigCsv(data);
      })
  }, []);
  return <BigDataContext.Provider value={bigCsv}>{children}</BigDataContext.Provider>;
};

export default BigDataContext;
