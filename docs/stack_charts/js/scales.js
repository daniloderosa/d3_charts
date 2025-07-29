// Initialize the scales here
const xScale = d3.scaleBand();

const colorScale = d3.scaleOrdinal();

const defineScales = (data) => {
  // Define the scales domain and range here
  xScale
    .domain(data.map((d) => d.year))
    .range([0, innerWidth])
    .paddingInner(0.2);

  colorScale
    .domain(formatsInfo.map((f) => f.id))
    .range(formatsInfo.map((f) => f.color));
};
