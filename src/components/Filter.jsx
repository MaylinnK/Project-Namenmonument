/* eslint-disable eqeqeq */
import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";
import SmallDataContext from "../providers/SmallDataContext";

const Filter = (data, i) => {
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

  function updateData(text, results) {
    results = [];
    text = document.querySelector("input[type='text']").value;
    data.map((person) => {
      // console.log(Object.keys(data[0])[0]);
      if (Object.keys(person)[1] == "Bron") {
        if (person.Naam.includes(text) == true) {
          results.push(person);
          // console.log("Success small");
        } 
      }
      else if (Object.keys(person)[0] == "prs_id") {
        if (person.prs_naam.includes(text) == true) {
          results.push(person);
          // console.log("Success big");
        } 
      }
      else {
        console.log("solved")
      }
    });
    console.log(results);
  }

  function html() {
    data.map((person) => {
      if (Object.keys(data)[0] == "prs_id") {
        return <p id={person.prs_id}>{person.prs_naam}</p>;
      } else if (Object.keys(data)[0] == "ID") {
        return <p id={person.id}>{person.Naam}</p>;
      }
    });
  }

  function classToggle(element) {
    element = document.getElementById("filter");
    element.classList.remove("open");
  }
  return (
    <>
      <section id="filter">
        <article>
          <form>
            <input
              onChange={updateData}
              type="text"
              placeholder="Bijv. Saroenij"
            />
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
            if (Object.keys(data[0])[0] == "prs_id") {
              return <p id={person.prs_id}>{person.prs_naam}</p>;
            } else if (Object.keys(data[0])[0] == "ID") {
              return <p id={person.id}>{person.Naam}</p>;
            }
          })}
        </article>
      </section>
    </>
  );
};

export default Filter;
