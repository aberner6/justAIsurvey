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


var numRows = 6; //this is how many question types there are for both sections
var numCols = 6;

const row = d3.scaleBand()
	.domain(d3.range(numRows))
	.range([width/2, width-leftMargin])
	.padding(0.05);

const rowT = d3.scaleBand()
	.domain(d3.range(numRows))
	.range([leftMargin, width/2])
	.padding(0.05);

const col = d3.scaleBand()
	.domain(d3.range(numCols))
	.range([topMargin, height-topMargin])
	.padding(0.05);


var originX = 0;
var originY = 0;
var outerCircleRadius = (height/2)/numRows; //scaled to page?
var chairOriginX = originX + ((outerCircleRadius) * Math.sin(0));
var chairOriginY = originY - ((outerCircleRadius) * Math.cos(0));

var idVals = [];
var theVals = [];
var maxTotal = 0;
var maxTheme, maxId = 0;
var barScale = d3.scaleLinear()
	.domain([0, maxTotal]) //minimum, maximum incoming total
	.range([0, outerCircleRadius/2])
d3.json("data_totals.json").then(function(data) {

	console.log(data);
	sdata = data.children;

	var gid = svg.selectAll(".gID")
		.data(sdata[0].children)
		.join("g")
		.attr("class", function(d){
			return d.name;
		})
		.attr('transform', function(d,i){ 
			// console.log(i); 
			return `translate(${row(i)}, ${col(i)})` 
		});
	var outerCircle = gid
		.append("circle")
		.attr("cx",originX)
		.attr("cy",originY)
		.attr("r",outerCircleRadius) //if this is small then it is like an inner circle
		.attr("fill","none")
		.attr("stroke","lightgrey");
	gid.append('text')
		.attr('font-size', 6)
		.attr('font-family', 'sans-serif')
		.attr('x', 0)
		.attr('y', 0)
		.text(d => d.name);
	var gthe = svg.selectAll(".gTHE")
		.data(sdata[1].children)
		.join("g")
		.attr("class", function(d){
			// console.log(d);
			return d.name;
		})
		.attr('transform', function(d,i){ 
			// console.log(i); 
			return `translate(${rowT(i)}, ${col(i)})` 
		});
	var outerCircle = gthe
		.append("circle")
		.attr("cx",originX)
		.attr("cy",originY)
		.attr("r",outerCircleRadius) //if this is small then it is like an inner circle
		.attr("fill","none")
		.attr("stroke","lightgrey");
	gthe.append('text')
		.attr('font-size', 6)
		.attr('font-family', 'sans-serif')
		.attr('x', 0)
		.attr('y', 0)
		.text(d => d.name);







  	var rectIdentity = gid.selectAll('.rectID')
		.data(d => d.children)
		.join('rect')
		.attr("class",function(d){
			idVals.push(d.value);
			return "rectID";
		})
		.attr("width",5)
		.attr("fill","pink")
		.attr("stroke","blue")
	    .attr("x", chairOriginX )
	    .attr("y", chairOriginY )
		.attr("transform", function(d,i){
			return "rotate("+(10*i)+", 0, 0)";
		}) 
		.attr("height",0);
	maxId = d3.max(idVals);
  	var rectTheme = gthe.selectAll('.rectTHE')
		.data(d => d.children)
		.join('rect')
		.attr("class",function(d){
			theVals.push(d.value);
			return "rectTHE"
		})
		.attr("width",5)
		.attr("fill","pink")
		.attr("stroke","blue")
	    .attr("x", chairOriginX ) //- (chairWidth / 2)
	    .attr("y", chairOriginY ) //- (chairWidth / 2)
		.attr("transform", function(d,i){
			return "rotate("+(10*i)+", 0, 0)";// calculate angle more smartly
		}) 
		.attr("height",0);
	maxTheme = d3.max(theVals);

	if(maxId>0 && maxTheme>0){
		// console.log(maxTotal)
		if(maxId>maxTheme){
			maxTotal = maxId;
			// console.log(maxTotal)
		}else{
			maxTotal = maxTheme;
			// console.log(maxTotal)
		}
	}

	if(maxTotal>0){
		barScale.domain([0, maxTotal]) 

		// console.log(maxTotal)
		rectIdentity.transition().duration(4000).attr("height", function(d,i){
			// console.log(d.value)
			console.log(barScale(d.value))
			return barScale(d.value);
			// return 1+(d.value*outerCircleRadius/2); //scale this to min and max and outer radius size
		})
		rectTheme.transition().duration(4000).attr("height", function(d,i){
			console.log(barScale(d.value))
			return barScale(d.value);
			// return 1+(d.value*outerCircleRadius/2); //scale this to min and max and outer radius size
		})
	}
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