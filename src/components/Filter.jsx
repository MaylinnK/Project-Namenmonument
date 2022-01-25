import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";
import SmallDataContext from "../providers/SmallDataContext";

const Filter = (data, i, html, ans) => {
  let bigData = useContext(BigDataContext);
  let smallData = useContext(SmallDataContext);
  if (!smallData) {
    return <h1>Loading...</h1>;
  } else if (!bigData) {
    return <h1>Loading...</h1>;
  }

  data = [];

  for (i = 0; i < bigData.length; i++) {
    data.push(bigData[i]);
  }
  for (i = 0; i < smallData.length; i++) {
    data.push(smallData[i]);
  }

  // function html() {
  //   return data.map((person) => (
  //    Object.keys(data)[0] == "prs_id" ? <p id={person.prs_id}>{person.prs_naam}</p> : <p id={person.id}>{person.naam}</p>
  //   )
  // }

  function html() {
    data.map((person) => {
      if (Object.keys(data)[0] == "prs_id") {
        return <p id={person.prs_id}>{person.prs_naam}</p>;
      } else if (Object.keys(data)[0] == "ID") {
        return <p id={person.id}>{person.Naam}</p>;
      }
    });
  }

  console.log(smallData);
  function classToggle(element) {
    element = document.getElementById("filter");
    element.classList.remove("open");
  }
  return (
    <>
      <section id="filter">
        <article>
          <form>
            <input type="text" placeholder="Bijv. Saroenij" />
            <label>
              <input type="checkbox" />
              Tot-slaaf-gemaakten
            </label>
            <label>
              <input type="checkbox" />
              Eigenaren
            </label>
          </form>
          <span>
            <span onClick={classToggle} className="streep"></span>
            <span onClick={classToggle} className="streeptwee"></span>
          </span>
        </article>
        <article>
          {data.map((person) => {
            if (Object.keys(data)[0] == "prs_id") {
              return <p id={person.prs_id}>{person.prs_naam}</p>;
            } else if (Object.keys(data)[0] == "ID") {
              return <p id={person.id}>{person.Naam}</p>;
            }
          })}
        </article>
      </section>
    </>
  );
};

export default Filter;
