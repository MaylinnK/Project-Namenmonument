/* eslint-disable eqeqeq */
import * as d3 from "d3";
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

  data = data.slice(250, 750);

  // Pushes search results to array
  function updateData(text, results) {
    results = [];
    text = document.querySelector("input[type='text']").value;
    data.map((person) => {
      if (Object.keys(person)[1] == "Bron") {
        if (person.Naam.includes(text) == true) {
          results.push(person);
        }
      } else if (Object.keys(person)[0] == "prs_id") {
        if (person.prs_naam.includes(text) == true) {
          results.push(person);
        }
      } else {
      }
    });
    console.log(results)
  }

// Loads the names in search tabs
  function loadData() {
    return data.map((person) => {
      if (Object.keys(person)[0] == "prs_id") {
        return (
          <span key={person.ove_UUID} id={person.ove_UUID} onClick={detail}>
            <p id={person.ove_UUID}>{person.prs_naam}</p>
            <p className="label" id={person.ove_UUID}>
              Tot-slaaf-gemaakte
            </p>
            <img id={person.ove_UUID} src="/pijl.svg" />
          </span>
        );
      } else if (Object.keys(person)[0] == "ID") {
        return (
          <span key={person.ID} id={person.ID} onClick={detail}>
            <p id={person.ID}>{person.Naam}</p>
            <p className="label" id={person.ID}>
              Tot-slaaf-gemaakte
            </p>
            <img id={person.ID} src="/pijl.svg" />
          </span>
        );
      }
    });
  }

// Loads detail page after clicking a name in search tab
  function detail(event, targetData) {
    if (event.target.id.includes("-")) {
      targetData = data.filter((person) => person.ove_UUID == event.target.id);
      targetData = targetData[0]
      document.getElementById("filter").classList.remove("open");
      document.getElementById("detail").classList.add("open");
      let keys = Object.keys(targetData);
      keys.map((key) => {
        if (targetData[key] == "") {
          targetData[key] = "Onbekend";
        }
      });
      let geslacht = "";
      if (
        targetData.prs_geslacht == "Vrouw" ||
        targetData.prs_geslacht == "Meisjes"
      ) {
        geslacht = "vrouw";
      } else if (
        targetData.prs_geslacht == "Man" ||
        targetData.prs_geslacht == "Jongens"
      ) {
        geslacht = "man";
      } else {
        geslacht = "leeg";
      }
      d3.select(".naam").html(
        targetData.prs_naam + "<img src='/" + geslacht + ".svg'>"
      );
      d3.select(".info").html(function () {
        return (
          "<div class= 'pers'><h3>Personalia</h3><p>Leeftijd: <strong>" +
          targetData.prs_leeftijd +
          "</strong><img src='/oog-blauw.svg'></p><p>Moeders naam: <strong>" +
          targetData.prs_moedersnaam +
          "</strong><img src='/oog-blauw.svg'></p><p>Geboortejaar: <strong>" +
          targetData.prs_geboortedatum +
          "</strong><img src='/oog-blauw.svg'></p></div><div class='plan'><h3>Info</h3><p>Eigenaar: <strong>" +
          targetData.ove_eigenaar +
          "</strong><img src='/oog-blauw.svg'></p><article><p>Inschrijfdatum: <img src='/oog-blauw.svg'><strong>" +
          targetData.ove_datum_inschrijving +
          "</strong><span>" +
          targetData.ove_datumtekst_inschrijving +
          "</span></p><p>Uitschrijfdatum: <img src='/oog-blauw.svg'><strong>" +
          targetData.ove_datum_uitschrijving +
          "</strong><span>" +
          targetData.ove_datumtekst_uitschrijving +
          "</span></p></article></div><div class='doc'><h3>Documentatie</h3><p>Soort documentatie: <strong>Rechtbankpapier</strong><img src='/oog-blauw.svg'><span>Geen extra informatie bekend</span></p></div>"
        );
      });
    } else {
      targetData = data.filter((person) => person.ID == event.target.id);
      document.getElementById("filter").classList.remove("open");
      document.getElementById("detail").classList.add("open");

      let keys = Object.keys(targetData);
      keys.map((key) => {
        if (targetData[key] == "") {
          targetData[key] = "Onbekend";
        }
      });

      let geslacht = "";
      if (targetData.Geslacht == "V") {
        geslacht = "vrouw";
      } else if (targetData.Geslacht == "M") {
        geslacht = "man";
      } else {
        geslacht = "leeg";
      }

      let opmerking = targetData.Opmerkingen;
      if (targetData.Opmerkingen == "\r") {
        opmerking = "Geen opmerkingen";
      }

      d3.select(".naam").html(
        targetData.Naam + "<img src='/" + geslacht + ".svg'>"
      );

      d3.select(".info").html(function () {
        return (
          "<div class= 'pers'><h3>Personalia</h3><p>Leeftijd: <strong>" +
          targetData.Leeftijd +
          "</strong><img src='/oog-blauw.svg'></p><p>Afkomst: <strong>" +
          targetData.Toponiem +
          "</strong><img src='/oog-blauw.svg'></p><p>Geboortejaar: <strong>" +
          targetData["Schatting geboortejaar"] +
          "</strong><img src='/oog-blauw.svg'></p><p>Kinderen: <strong>" +
          targetData.Kinderen +
          "</strong><img src='/oog-blauw.svg'></p><p>Sterfdatum: <strong>" +
          targetData.Sterfdatum +
          "</strong><img src='/oog-blauw.svg'></p><span class='klein'>" +
          opmerking +
          "</span>"
        );
      });
    }
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
        <article>{loadData()}</article>
      </section>
    </>
  );
};

export default Filter;
