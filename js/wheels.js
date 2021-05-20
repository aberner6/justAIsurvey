var div = document.getElementById("my_dataviz");
var rect = div.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

var leftMargin = 100;
var topMargin = leftMargin;

var svg = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
var sdata;


var numRows = 6;
var numCols = 6;
const row = d3.scaleBand()
  .domain(d3.range(numRows))
  .range([leftMargin, width-leftMargin])
  .padding(0.05);

const col = d3.scaleBand()
  .domain(d3.range(numCols))
  .range([topMargin, height-topMargin])
  .padding(0.05);

d3.json("data_totals.json").then(function(data) {

	console.log(data);
	sdata = data.children;

	var gid = svg.selectAll("g")
		.data(sdata[0].children)
		.join("g")
		.attr("class", function(d){
			console.log(d);
			return d.name;
		})
		.attr('transform', function(d,i){ 
			console.log(i); 
			return `translate(${row(i)}, ${col(i)})` 
			// return `translate(${col(i)}, ${row(i)})` 
			// return `translate(${row(i)}, ${topMargin})` 
		});

	gid.append('text')
		.attr('font-size', 6)
		.attr('font-family', 'sans-serif')
		.attr('x', 0)
		.attr('y', 0)
		.text(d => d.name);

	var originX = 0;
	var originY = 0;
	var outerCircleRadius = 30; //scaled to page?
	var chairOriginX = originX + ((outerCircleRadius) * Math.sin(0));
	var chairOriginY = originY - ((outerCircleRadius) * Math.cos(0));

	var outerCircle = gid
		.append("circle")
		.attr("cx",originX)
		.attr("cy",originY)
		.attr("r",outerCircleRadius)
		.attr("fill","none")
		.attr("stroke","lightgrey")

  	gid.selectAll('rectID')
		.data(d => d.children)
		.join('rect')
		.attr("width",5)
		.attr("fill","pink")
		.attr("stroke","blue")
		.attr("height", function(d,i){
			return 1+(d.value*outerCircleRadius/2); //scale this to min and max and outer radius size
		})
	    .attr("x", chairOriginX ) //- (chairWidth / 2)
	    .attr("y", chairOriginY ) //- (chairWidth / 2)
		.attr("transform", function(d,i){
			// calculate angle more smartly
			// 
			return "rotate("+(10*i)+", 0, 0)";
		}) 

})




	// var outline = gid.selectAll(".node").append('rect').attr("class", "node")
	// 	.attr('width', col.bandwidth())
	// 	.attr('height', row.bandwidth())
	// 	.attr('fill', 'white')
	// 	.attr('stroke', 'red');
	// gid.selectAll('text')
	// 	.data(d => d.children)
	// 	.join('text')
	// 	  .attr('font-size', 15)
	// 	  .attr('font-family', 'sans-serif')
	// 	  .attr('dominant-baseline', 'hanging')
	// 	  .attr('x', 5)
	// 	  .attr('y', (d, i) => i * 15 + 2)
	// 	  .text(d => d.value);