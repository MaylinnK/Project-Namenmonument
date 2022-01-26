/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
import useD3 from "../hooks/useD3";
import * as d3 from "d3";
import { useContext } from "react";
import BigDataContext from "../providers/BigDataContext";
import SmallDataContext from "../providers/SmallDataContext";

function Hemel(bigDataFiltered, smallDataFiltered, targetData, i) {
  bigDataFiltered = useContext(BigDataContext);
  smallDataFiltered = useContext(SmallDataContext);
  targetData = [];

  const ref = useD3((svg) => {
    if (!smallDataFiltered) {
      return <h1>Loading...</h1>;
    } else if (!bigDataFiltered) {
      return <h1>Loading...</h1>;
    }

    var n = 3000; // number of points
    var max = 2000; // maximum of x and y

    // dimensions and margins
    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      width = 0.8 * width;
    height = 0.8 * height;
    var margin = {
      top: 0.1 * width,
      right: 0.1 * width,
      bottom: 0.1 * width,
      left: 0.1 * width,
    };

    // create a clipping region
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // create scale objects
    var xScale = d3.scaleLinear().domain([250, 1000]).range([0, width]);
    var yScale = d3.scaleLinear().domain([250, 1000]).range([height, 0]);
    // create axis objects
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    // Draw Axis
    var gX = svg
      .append("g")
      .attr("class", "axisx")
      .attr(
        "transform",
        "translate(" + margin.left + "," + (margin.top + height) + ")"
      )
      .call(xAxis);
    var gY = svg
      .append("g")
      .attr("class", "axisy")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(yAxis);

    // Pan and zoom
    var zoom = d3
      .zoom()
      // .translateExtent([0,2000], [2000,0])
      .scaleExtent([1, 200])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", zoomed);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

    // Draw Datapoints
    var points_b = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("clip-path", "url(#clip)")
      .classed("points_b", true);

    var points_s = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("clip-path", "url(#clip)")
      .classed("points_s", true);

    let ranBigData = genRandomData(bigDataFiltered, n, max);
    let ranSmallData = genRandomData(smallDataFiltered, n, max);

    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    let pointsB = points_b.selectAll("circle").data(ranBigData);
    pointsB = pointsB
      .enter()
      .append("path")
      // eslint-disable-next-line no-loop-func
      .attr(
        "d",
        "M34.7,32.57c1.87,0,3.73,0,5.59-.13L50,32l-9.71-.46c-1.86-.09-3.72-.13-5.59-.13H32.06a7,7,0,0,0-1.65-3.87c.92-.92,1.8-1.87,2.66-2.84l4.57-5.22L32.41,24c-1,.85-1.92,1.74-2.84,2.66a7,7,0,0,0-4-1.65V18.91c0-1.94,0-3.89-.11-5.83L25,0l-.48,13.08c-.07,1.94-.11,3.89-.11,5.84V25a7.07,7.07,0,0,0-3.92,1.6c-.93-.93-1.89-1.83-2.87-2.69L12.4,19.37,17,24.59c.86,1,1.75,1.94,2.68,2.87a7,7,0,0,0-1.71,3.93H14.79c-1.53,0-3,0-4.57.11L0,32l10.22.48c1.52.07,3,.11,4.57.11h3.13a7.1,7.1,0,0,0,1.66,4.12l-.11.11c-.77.77-1.51,1.56-2.22,2.38l-4.82,5.5,5.5-4.82c.81-.71,1.61-1.45,2.37-2.22l.12-.11a7.07,7.07,0,0,0,4,1.65v5.21c0,2.38,0,4.77.13,7.15L25,64l.46-12.42q.13-3.57.13-7.15V39.18a7,7,0,0,0,4.06-1.71l.08.08c.77.77,1.56,1.51,2.38,2.22l5.49,4.82-4.81-5.5c-.71-.82-1.46-1.61-2.22-2.38l-.09-.09a7.08,7.08,0,0,0,1.6-4Z"
      )
      .attr("transform", function (d) {
        return (
          "translate(" +
          xScale(d.x * 1.2 - 100) +
          ", " +
          yScale(d.y * 1.2 - 100) +
          ")"
        );
      })
      .attr("class", function (d) {
        return d.z;
      })
      .attr("class", "big")
      .attr("r", 5)
      .on("click", function (event, j) {
        d3.selectAll("circle, path")
          .style("fill", "#ffffff")
          .style("filter", "drop-shadow( 0px 0px 4px white) blur(0.7px)");
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + 10 + "px")
          .style("display", "flex")
          .style("position", "absolute")
          .html(function (d) {
            targetData = [];
            targetData.push(bigDataFiltered[j.z]);
            console.log(targetData);
            let geslacht = "";
            if (
              bigDataFiltered[j.z].prs_geslacht == "Vrouw" ||
              bigDataFiltered[j.z].prs_geslacht == "Meisjes"
            ) {
              geslacht = "vrouw";
            } else if (
              bigDataFiltered[j.z].prs_geslacht == "Man" ||
              bigDataFiltered[j.z].prs_geslacht == "Jongens"
            ) {
              geslacht = "man";
            } else {
              geslacht = "leeg";
            }

            let leeftijd = bigDataFiltered[j.z].prs_leeftijd;
            if (bigDataFiltered[j.z].prs_leeftijd == "") {
              leeftijd = "Onbekend";
            }
            // eslint-disable-next-line no-useless-concat
            return (
              "<span>" +
              bigDataFiltered[j.z].prs_naam +
              "<img src='/" +
              geslacht +
              ".svg'>" +
              "</span>" +
              "<img>" +
              "<span>" +
              "Leeftijd: " +
              "<strong>" +
              leeftijd +
              "</strong>" +
              "</span>" +
              "<span>" +
              "<input id='meer' type='checkbox' value=" +
              j.z +
              ">" +
              "<label for='meer'> Meer informatie </label>" +
              "<img src='/pijl.svg'>" +
              "</span>"
            );
          });
        d3.select(this)
          .style("fill", "#FFB800")
          .style(
            "filter",
            "drop-shadow(rgb(0, 255, 0) 0px 0px 6px) blur(0.7px)"
          );
      });

    let pointsS = points_s.selectAll("circle").data(ranSmallData);
    pointsS = pointsS
      .enter()
      .append("circle")
      // eslint-disable-next-line no-loop-func
      .attr("cx", function (d) {
        return xScale(d.x);
      })
      .attr("cy", function (d) {
        return yScale(d.y);
      })
      .attr("class", function (d) {
        return d.z;
      })
      .attr("class", "small")
      .attr("r", 5)
      .on("click", function (event, j) {
        d3.selectAll("circle, path")
          .style("fill", "#ffffff")
          .style("filter", "drop-shadow( 0px 0px 4px white) blur(0.7px)");

        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + 10 + "px")
          .style("display", "flex")
          .style("position", "absolute")
          .html(function (d) {
            targetData = [];
            targetData.push(smallDataFiltered[j.z]);
            console.log(targetData);
            let geslacht = "";
            if (smallDataFiltered[j.z].Geslacht == "V") {
              geslacht = "vrouw";
            } else if (smallDataFiltered[j.z].Geslacht == "M") {
              geslacht = "man";
            } else {
              geslacht = "leeg";
            }

            let leeftijd = smallDataFiltered[j.z].Leeftijd;
            if (smallDataFiltered[j.z].Leeftijd == "") {
              leeftijd = "Onbekend";
            }
            // eslint-disable-next-line no-useless-concat
            return (
              "<span>" +
              smallDataFiltered[j.z].Naam +
              "<img src='/" +
              geslacht +
              ".svg'>" +
              "</span>" +
              "<img>" +
              "<span>" +
              "Leeftijd: " +
              "<strong>" +
              leeftijd +
              "</strong>" +
              "</span>" +
              "<span>" +
              "<input id='meer' type='checkbox' value=" +
              j.z +
              ">" +
              "<label for='meer'> Meer informatie </label>" +
              "<img src='/pijl.svg'>" +
              "</span>"
            );
          });
        d3.select(this)
          .style("fill", "#FFB800")
          .style(
            "filter",
            "drop-shadow(rgb(0, 255, 0) 0px 0px 6px) blur(0.7px)"
          );
      });

    d3.select(".toolTip").on("click", function (element) {
      loadData();
      element = document.getElementById("detail");
      if (element.classList.contains("open" == "true")) {
      } else {
        d3.select("#detail").attr("class", "open");
      }
    });

    function loadData() {
      targetData = targetData[0];
      if (Object.keys(targetData)[0] == "ID") {
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

        // d3.select(".header").append("div").attri("class", "naam");
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
      } else if (Object.keys(targetData)[0] == "prs_id") {
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

        // d3.select(".header").append("div").attri("class", "naam");
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
      }
    }

    function genRandomData(data, n, max, i) {
      var stars = [];
      var datapoint = {};
      for (i = 0; i < data.length; i++) {
        datapoint = {};
        datapoint["x"] = Math.random() * max;
        datapoint["y"] = Math.random() * max;
        datapoint["z"] = i;
        stars.push(datapoint);
      }
      return stars;
    }

    function zoomed(event) {
      // create new scale ojects based on event
      var new_xScale = event.transform.rescaleX(xScale);
      var new_yScale = event.transform.rescaleY(yScale);
      // update axes
      gX.call(xAxis.scale(new_xScale));
      gY.call(yAxis.scale(new_yScale));
      pointsS
        .data(ranSmallData)
        .attr("cx", function (d) {
          return new_xScale(d.x);
        })
        .attr("cy", function (d) {
          return new_yScale(d.y);
        });
      d3.select(".toolTip").style("display", "none");

      pointsB.data(ranBigData).attr("transform", function (d) {
        return (
          "translate(" +
          new_xScale(d.x * 1.2 - 100) +
          ", " +
          new_yScale(d.y * 1.2 - 100) +
          ")"
        );
      });
      d3.select(".toolTip").style("display", "none");
      d3.selectAll("circle, path")
        .style("fill", "#ffffff")
        .style("filter", "drop-shadow( 0px 0px 4px white) blur(0.7px)");
    }
  });

  return <svg width="2264" height="1500" ref={ref}></svg>;
}
export default Hemel;
