
// set the dimensions and margins of the graph
var width = 900
var height = 1000
var radius = width / 2 // radius of the dendrogram

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height).style("position","absolute")
  .append("g")
    .attr("transform", "translate(" + (width/2) + "," + (radius+200) + ")");



  var partition = d3.partition()
      .size([2 * Math.PI, radius])

// read json data
d3.json("data_dendrogram.json").then(function(data) {
  console.log(data);

  var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 20))

  var arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1)

  var sortData = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
  console.log(sortData)


  var root = partition(sortData);

  console.log(root);

  svg.append("g")
      .attr("fill-opacity", 0.3)
    .selectAll("path")
    .data(root.descendants().filter(d => d.depth))
    .join("path")
      .attr("fill", d => { 
        // while (d.depth > 1) d = d.parent; 
        return color(d.data.name); })
      .attr("d", arc)
    // .append("title")
      // .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${(d.value)}`);

  svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);    

})