// Load the data here

d3.csv("data/daily_precipitations.csv", d3.autoType).then((data) => {
  console.log();
  drawArc(data);
});

// Draw the arc here
const drawArc = (data) => {
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  const svg = d3
    .select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  const innerChart = svg.append("g").attr(
    "transform",
    `translate(${pieChartWidth / 2}, 
            ${pieChartHeight / 2})`
  );

  const numberOfDays = data.length;
  const numberOfDaysWithPrecipitation = data.filter(
    (d) => d.total_precip_in > 0
  ).length;
  const percentageDaysWithPrecipitation = Math.round(
    (numberOfDaysWithPrecipitation / numberOfDays) * 100
  );
  const angleDaysWithPrecipitation_deg =
    (percentageDaysWithPrecipitation * 360) / 100;
  const angleDaysWithPrecipitation_rad =
    (angleDaysWithPrecipitation_deg * Math.PI) / 180;

  const arcGenerator = d3
    .arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .cornerRadius(6);

  innerChart
    .append("path")
    .attr("d", () => {
      return arcGenerator({
        startAngle: 0,
        endAngle: angleDaysWithPrecipitation_rad,
      });
    })
    .attr("fill", "#6EB7C2");

  innerChart
    .append("path")
    .attr("d", () => {
      return arcGenerator({
        startAngle: angleDaysWithPrecipitation_rad,
        endAngle: 2 * Math.PI,
      });
    })
    .attr("fill", "#DCE2E2");

  const centroid = arcGenerator
    .startAngle(0)
    .endAngle(angleDaysWithPrecipitation_rad)
    .centroid();
  innerChart
    .append("text")
    .text((d) => d3.format(".0%")(percentageDaysWithPrecipitation / 100))
    .attr("x", centroid[0])
    .attr("y", centroid[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 500);
};
