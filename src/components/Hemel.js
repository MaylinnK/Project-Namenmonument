/* eslint-disable eqeqeq */
import useD3 from "../hooks/useD3";
import * as d3 from "d3";
import { useContext } from "react";
import BigDataContext from "../providers/BigDataContext";
import SmallDataContext from "../providers/SmallDataContext";
import { style } from "d3";

function Hemel(ranData, bigData, smallData, i) {
  bigData = useContext(BigDataContext);
  smallData = useContext(SmallDataContext);

  const ref = useD3((svg) => {
    if (!smallData) {
      return <h1>Loading...</h1>;
    } else if (!bigData) {
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

    let g = svg.attr("width", width).attr("height", height).append("g");

    // create scale objects
    var xScale = d3.scaleLinear().domain([1590, 1950]).range([0, width]);
    var yScale = d3.scaleLinear().domain([500, 1500]).range([height, 0]);
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

    let bigDataFiltered = [];
    for (i = 0; i < n / 2; i++) {
      bigDataFiltered.push(bigData[i]);
    }
    let smallDataFiltered = [];
    for (i = 0; i < n / 2; i++) {
      smallDataFiltered.push(smallData[i]);
    }
    let ranBigData = genRandomData(bigDataFiltered, n, max);
    let ranSmallData = genRandomData(bigDataFiltered, n, max);

    const tooltip = d3.select("body").append("div").attr("class", "toolTip");

    let pointsB = points_b.selectAll("circle").data(ranBigData);
    pointsB = pointsB
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
      .attr("class", "big")
      .attr("r", 5)
      .on("click", function (event, j) {
        d3.selectAll("circle")
          .style("fill", "#fdffbd")
          .style(
            "filter",
            "drop-shadow( 0px 0px 4px rgba(0, 255, 0, 1.7)) blur(1px)"
          );

        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + 10 + "px")
          .style("display", "flex")
          .style("position", "absolute")
          .html(function (d) {
            console.log(smallData);
            let geslacht = "";
            if (
              bigData[j.z].prs_geslacht == "Vrouw" ||
              bigData[j.z].prs_geslacht == "Meisjes"
            ) {
              geslacht = "vrouw";
            } else if (
              bigData[j.z].prs_geslacht == "Man" ||
              bigData[j.z].prs_geslacht == "Jongens"
            ) {
              geslacht = "man";
            } else {
              geslacht = "leeg";
            }

            let leeftijd = bigData[j.z].prs_leeftijd;
            if (bigData[j.z].prs_leeftijd == "") {
              leeftijd = "Onbekend";
            }
            // eslint-disable-next-line no-useless-concat
            return (
              "<span>" +
              bigData[j.z].prs_naam +
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
          .style("fill", "red")
          .style(
            "filter",
            "drop-shadow( 0px 0px 6px rgba(255, 0, 0, 1.7)) blur(1px)"
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
        d3.selectAll("circle")
          .style("fill", "#fdffbd")
          .style(
            "filter",
            "drop-shadow( 0px 0px 4px rgba(0, 255, 0, 1.7)) blur(1px)"
          );
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + 10 + "px")
          .style("display", "flex")
          .style("position", "absolute")
          .html(function (d) {
            console.log(smallData);
            let geslacht = "";
            if (smallData[j.z].Geslacht == "V") {
              geslacht = "vrouw";
            } else if (smallData[j.z].Geslacht == "M") {
              geslacht = "man";
            } else {
              geslacht = "leeg";
            }

            let leeftijd = smallData[j.z].Leeftijd;
            if (smallData[j.z].Leeftijd == "") {
              leeftijd = "Onbekend";
            }
            // eslint-disable-next-line no-useless-concat
            return (
              "<span>" +
              smallData[j.z].Naam +
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
          .style("fill", "red")
          .style(
            "filter",
            "drop-shadow( 0px 0px 6px rgba(255, 0, 0, 1.7)) blur(1px)"
          );
      });

    function genRandomData(bigData, n, max, i, datum) {
      var data = [];
      var datapoint = {};
      for (i = 0; i < n / 2; i++) {
        datapoint = {};
        datapoint["x"] = Math.random() * max;
        datapoint["y"] = Math.random() * max;
        datapoint["z"] = i;
        data.push(datapoint);
      }
      return data;
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

      pointsB
        .data(ranBigData)
        .attr("cx", function (d) {
          return new_xScale(d.x);
        })
        .attr("cy", function (d) {
          return new_yScale(d.y);
        });
      d3.select(".toolTip").style("display", "none");
      d3.selectAll("circle")
        .style("fill", "#fdffbd")
        .style(
          "filter",
          "drop-shadow( 0px 0px 4px rgba(0, 255, 0, 1.7)) blur(1px)"
        );
    }
  });
  return <svg width="2264" height="1020" ref={ref}></svg>;
}
export default Hemel;
