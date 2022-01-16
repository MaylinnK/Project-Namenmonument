import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";

const Person = () => {
  let data = useContext(BigDataContext);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {data.map((person) => (
        <Fragment key={person.id}>
          <p>
            {person.prs_naam}
          </p>
        </Fragment>
      ))}
    </>
  );
};

export default Person;
