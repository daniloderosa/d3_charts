const drawPyramid = (data) => {
  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = { top: 40, right: 30, bottom: 40, left: 60 };
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3
    .select("#pyramid")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const femaleSalaries = d3.filter(data, (d) => d.gender === "Female");
  const maleSalaries = d3.filter(data, (d) => d.gender === "Male");
  const binGenerator = d3.bin().value((d) => d.salary);
  const femaleBin = binGenerator(femaleSalaries);
  const maleBin = binGenerator(maleSalaries);

  const minSalary = maleBin[0].x0;
  const maxSalary = maleBin[maleBin.length - 1].x1;
  const yScale = d3
    .scaleLinear()
    .domain([minSalary, maxSalary])
    .range([innerHeight, 0]);

  const xScaleMen = d3
    .scaleLinear()
    .domain([0, 15])
    .range([innerWidth / 2, innerWidth]);

  const xScaleWomen = d3
    .scaleLinear()
    .domain([0, 15])
    .range([innerWidth / 2, 0]);

  const pyramidContainer = innerChart
    .append("g")
    .attr("stroke", white)
    .attr("stroke-width", 2);

  pyramidContainer //men
    .selectAll("bar-men")
    .data(maleBin)
    .join("rect")
    .attr("class", "bar-men")
    .attr("x", (d) => xScaleMen(0))
    .attr("y", (d) => yScale(d.x1))
    .attr(
      "width",
      (d) => xScaleMen((d.length / data.length) * 100) - innerWidth / 2
    )
    .attr("height", (d) => yScale(d.x0) - yScale(d.x1))
    .attr("fill", menColor)
    .attr("stroke", white)
    .attr("stroke-width", 2);

  pyramidContainer
    .selectAll(".bar-women")
    .data(femaleBin)
    .join("rect")
    .attr("class", "bar-women")
    .attr("x", (d) => xScaleWomen((d.length / data.length) * 100))
    .attr("y", (d) => yScale(d.x1))
    .attr(
      "width",
      (d) => innerWidth / 2 - xScaleWomen((d.length / data.length) * 100)
    )
    .attr("height", (d) => yScale(d.x0) - yScale(d.x1))
    .attr("fill", womenColor);

  const bottomAxisMen = d3
    .axisBottom(xScaleMen)
    .tickValues([5, 10, 15])
    .tickSizeOuter(0);
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxisMen);
  const bottomAxisWomen = d3
    .axisBottom(xScaleWomen)
    .tickValues([15, 10, 5, 0])
    .tickSizeOuter(0);
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxisWomen);

  const leftAxis = d3.axisLeft(yScale);
  innerChart.append("g").call(leftAxis);
  svg.append("text").text("Yearly Salary (USD)").attr("x", 5).attr("y", 20);
  svg
    .append("text")
    .text("Percent")
    .attr("text-anchor", "middle")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 3);
};
