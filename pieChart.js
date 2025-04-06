export const pieChart = (svg, { data, width, height }) => {
    const radius = Math.min(width, height) / 2 - 60;
    const customColors = [
        '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
        '#009688', '#e91e63', '#8bc34a', '#ff9800',
        '#00bcd4', '#9c27b0', '#ffc107', '#3f51b5',
        '#4caf50', '#f44336', '#795548', '#607d8b',
        '#673ab7', '#cddc39', '#2196f3', '#ff5722'
      ];
      
      const color = d3.scaleOrdinal(customColors);
      
  
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    const arcs = g.selectAll('path')
      .data(pie(data))
      .enter().append('g');
  
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));
  
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text(d => d.data.category);
  
    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, ${height / 4})`);
  
    data.forEach((d, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
      legendRow.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', color(i));
      legendRow.append('text')
        .attr('x', 18)
        .attr('y', 10)
        .text(`${d.category} (${d.value})`);
    });
  
    // Axis labels (visual only, since pie has no actual X or Y axis)
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text('Categories (X-Axis)');
  
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Values (Y-Axis)');
  };
  