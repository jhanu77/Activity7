// Load the dataset from the external URL
d3.json("https://gist.githubusercontent.com/jhanu77/c2e873c226a7395015ed31e2a718b5dc/raw/babcbb635e29787684cbee6628ec41f2414ff0d9/gistfile1.txt")
  .then(function(data) {
    console.log("Loaded Data:", data);

    if (!data || !data.length) {
      console.error("Data format is invalid or empty.");
      return;
    }

    const formattedData = data.map(d => ({
      category: d.category,
      value: +d.value  // Ensure it's a number
    }));

    createPieChart(formattedData);
  })
  .catch(function(error) {
    console.error('Error loading the data:', error);
  });

// Function to create the pie chart
function createPieChart(data) {
  const width = 750;
  const height = 600;
  const radius = Math.min(width, height) / 2 - 20;

  const svg = d3.select("#svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2 - 100}, ${height / 2})`);

  const color = d3.scaleOrdinal(d3.schemeTableau10.concat(d3.schemeSet3));
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const pie = d3.pie().sort(null).value(d => d.value);

  const filteredData = data.filter(d => d.value > 0);

  // Draw pie slices
  g.selectAll("path")
    .data(pie(filteredData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("stroke", "#fff")
    .attr("stroke-width", "1px");

  // Add labels inside the pie slices
  g.selectAll("text")
    .data(pie(filteredData))
    .enter()
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .text(d => d.data.category);

  // Add legend to the right
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 180}, 50)`);

  filteredData.forEach((d, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(i));

    legendRow.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .attr("font-size", 12)
      .text(`${d.category} (${d.value})`);
  });
}

