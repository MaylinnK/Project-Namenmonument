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

  data = data.slice(2500)

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
    loadData(results)
  }

  function loadData(results, html) {
    html = []
    data.map((person) => {
      if (Object.keys(person)[0] == "prs_id") {
        console.log("Het werkt")
        return (<span><p id={person.prs_id}>{person.prs_naam}</p> <p className= "label">Tot-slaaf-gemaakte</p> <img src="/pijl.svg"/></span>);
      } else if (Object.keys(person)[0] == "ID") {
        console.log("Het werkt")
        return (<span><p id={person.id}>{person.Naam}</p> <p className= "label">Tot-slaaf-gemaakte</p> <img src="/pijl.svg"/></span>);
      }
    })
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
          {loadData()}
        </article>
      </section>
    </>
  );
};

export default Filter;
