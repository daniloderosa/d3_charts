// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  //.style("border", "1px solid black");

d3.csv(
    "data/data.csv", d => {
      return {      // format the data in the row conversion function
        technology: d.technology,
        count: +d.count
      }
    }
  ).then(data => {      //js Promises: measure the data 
    //console.log(d3.max(data, d => d.count));
    data.sort((a,b) => b.count - a.count);

    createViz(data); //usually pass the data to another function that build the viz
  })

const createViz = (data) => {

const barHeight = 20;

const xScale = 
  d3.scaleLinear()
    .domain([0, 1078])
    .range([0, 450])

const yScale = 
  d3.scaleBand()
    .domain(data.map(d => d.technology))
    .range([0, 700])
    .paddingInner(0.2) //padding between each band. 0.2 means 20% of the height of the bands
    

const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.technology)})`);

barAndLabel
  .append("rect")
      .attr("class", d => {   // if function spreads over lines, then {} and return statement
        //console.log(d);
        return `bar bar-${d.technology}`;
      })
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("x", 100)
      .attr("y", 0)
      .attr("fill", d => d.technology === "D3.js" ? "yellowgreen" : "skyblue")

barAndLabel
  .append("text")
      .text(d => d.technology)
      .attr("x", 96)
      .attr("y", 12)
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("font-size", "11px");

barAndLabel
  .append("text")
      .text(d => d.count)
      .attr("x", d => xScale(d.count) + 100 + 4)
      .attr("y", 12)
      .style("font-family", "sans-serif")
      .style("font-size", "10px");

svg
  .append("line")
      .attr("x1", 100)
      .attr("y1", 0)
      .attr("x2", 100)
      .attr("y2", 700)
      .attr("stroke", "black")
};