import useD3 from "../hooks/useD3";
import * as d3 from "d3";
import { useContext } from "react";
import BigDataContext from "../providers/BigDataContext";

function Hemel(data) {
  // data = useContext(BerryContext);
  const ref = useD3((svg) => {
    var n = 1000; // number of points
    var max = 1900; // maximum of x and y

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
    var xScale = d3.scaleLinear().domain([1800, 1880]).range([0, width]);
    var yScale = d3.scaleLinear().domain([1800, 1880]).range([height, 0]);
    // create axis objects
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
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

    // Draw Datapoints
    var points_g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("clip-path", "url(#clip)")
      .classed("points_g", true);

    data = genRandomData(n, max);
    var points = points_g.selectAll("circle").data(data);
    points = points
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.x);
      })
      .attr("cy", function (d) {
        return yScale(d.y);
      })
      .attr("r", 5);

    // Pan and zoom
    var zoom = d3
      .zoom()
      .scaleExtent([0.6, 10])
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

    function genRandomData(n, max, i) {
      var data = [];
      var datapoint = {};
      for (i = 0; i < n; i++) {
        datapoint = {};
        datapoint["x"] = Math.random() * 100 + 1800;
        datapoint["y"] = Math.random() * max;
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
      points
        .data(data)
        .attr("cx", function (d) {
          return new_xScale(d.x);
        })
        .attr("cy", function (d) {
          return new_yScale(d.y);
        });
    }
  });
  return (
      <svg width="2064" height="920" ref={ref}></svg>
  );
}
export default Hemel;
