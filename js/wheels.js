var div = document.getElementById("my_dataviz");
var rect = div.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

var leftMargin = 100;
var topMargin = leftMargin;

var svg = d3.select("#my_dataviz")
	.append("svg")
    .attr("viewBox", [0, 0, width, height]);
// viewBox="50 50 100 100">

var sdata;

var figDepth = 3;
var outerCircleRadius = (width/8)/figDepth; //scaled to page?
var centerEX = width/2;
var centerEH = height/2;
var smallMarg = outerCircleRadius/4;
var posID = [
	{
		"x":centerEX,
		"y":centerEH-outerCircleRadius,
		"rot":340,
		"id":"ethicist"
	},
	{
		"x":centerEX+smallMarg,
		"y":centerEH-outerCircleRadius+smallMarg,
		"rot":45,
		"id":"funding"
	},
	{
		"x":centerEX-outerCircleRadius,
		"y":centerEH+outerCircleRadius*2,
		"rot":0,
		"id":"years in field"
	},
	{
		"x":centerEX-outerCircleRadius-smallMarg,
		"y":centerEH+outerCircleRadius*6+smallMarg,
		"rot":85,
		"id":"education"
	},
	{
		"x":centerEX-outerCircleRadius*3,
		"y":centerEH-outerCircleRadius-smallMarg,
		"rot":250,
		"id":"career path"
	}
]
var posTh = [
	{
		"x":centerEX+outerCircleRadius*4,
		"y":centerEH-outerCircleRadius-smallMarg*2,
		"rot":320,
		"id":"topics"
	},
	{
		"x":centerEX+outerCircleRadius*4+smallMarg*2,
		"y":centerEH-outerCircleRadius+smallMarg*2,
		"rot":75,
		"id":"domain"
	},
	{
		"x":centerEX+outerCircleRadius*6,
		"y":centerEH+outerCircleRadius*3,
		"rot":50,
		"id":"outputs"
	},
	{
		"x":centerEX+outerCircleRadius*7+smallMarg,
		"y":centerEH+outerCircleRadius*4.5,
		"rot":65,
		"id":"audiences"
	},
	{
		"x":centerEX+outerCircleRadius*8+smallMarg,
		"y":centerEH-outerCircleRadius-smallMarg*4,
		"rot":300,
		"id":"collab type"
	},
	{
		"x":centerEX+outerCircleRadius*9,
		"y":centerEH-outerCircleRadius-smallMarg*2,
		"rot":15,
		"id":"collab field"
	}
]
var idLine = [posID[4],posID[0],posID[1],posID[2],posID[3]]
var themeLine = [posTh[5],posTh[4],posTh[0],posTh[1],posTh[2],posTh[3]]
var cnctLine = [posID[0],posTh[0]];

var originX = 0;
var originY = 0;

//CHANGES HERE: CAREFUL!
//also changed spacing of space out of bars
var innerCircRad = outerCircleRadius/1.5;
var normOriginX = originX + (innerCircRad * Math.sin(0));
var normOriginY = originY + (innerCircRad * Math.cos(0));

var idVals = [];
var theVals = [];
var maxTotal = 0;
var maxTheme, maxId = 0;
var maxBar = outerCircleRadius*2-innerCircRad;
var barScale = d3.scaleLinear()
	.domain([0, maxTotal]) 
	.range([1, maxBar])

var yearsMax = 52;
var yearScale = d3.scaleLinear()
	.domain([0, yearsMax]) 
	.range([0,360])

var widthScale = d3.scaleLinear()
	.domain([0, 100])
	.range([5, .5])
var barwide = 5;
var yearsRadius = outerCircleRadius;

d3.json("totals_variation.json").then(function(data) {

	console.log(data);
	sdata = data.children;


	var gid = svg.selectAll(".gID")
		.data(sdata[0].children)
		.join("g")
		.attr("class", function(d,i){
			return d.name+posID[i].id;
		})
		.attr('transform', function(d,i){ 
			console.log(i);
			return `translate(${posID[i].x}, ${posID[i].y}), rotate(${posID[i].rot},0,0)` 
		});

	var innerCirc = gid
		.append("circle")
		.attr("class", "innerCirc")
		.attr("cx",0)
		.attr("cy",0)
		.attr("r", function(d){
			if(d.name=="years in field"){
				return yearsRadius;
			}else{
				return innerCircRad;
			} 
		}) 
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
			return d.name;
		})
		.attr('transform', function(d,i){ 
			return `translate(${posTh[i].x}, ${posTh[i].y}), rotate(${posTh[i].rot},0,0)` 
		});
	var innerCircTheme = gthe
		.append("circle")
		.attr("class", "innerCircTheme")
		.attr("cx",originX)
		.attr("cy",originY)
		.attr("r",innerCircRad) 
		.attr("fill","none")
		.attr("stroke","lightgrey");

	gthe.append('text')
		.attr('font-size', 6)
		.attr('font-family', 'sans-serif')
		.attr('x', 0)
		.attr('dy', -40)
		.text(d => d.name);

  	var rectMaxID = gid.selectAll('.rectMaxID')
		.data(d => d.children)
		.join('rect')
		.attr("class", "rectMaxID")
		.attr("width",function(d,i){
			if(d.q=="years" && yearsRadius>0){
				return widthScale(yearsMax);			
			}
			else{
				return barwide;
			}
		})
		.attr("fill",function(d){
			if(d.name=="space"){
				return "grey"
			}
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return "#46AAB3"
			}
			else{
				return "lightgrey"
			}
		}) 
	    .attr("x", function(d,i){
			if(d.q=="years" && yearsRadius>0){
	    		return originX+(yearsRadius*Math.sin(0));
	    	}else{
		    	return normOriginX;
	    	}
	    })
	    .attr("y", function(d){
			if(d.q=="years" && yearsRadius>0){
	    		return originY+(yearsRadius*Math.cos(0)); 
	    	}else{
		    	return normOriginY;
	    	}
	    })
		.attr("transform", function(d,i){
			if(d.q=="years" && yearsRadius>0){ 
				return "rotate("+(yearScale(i))+", 0, 0)";
			}else{
				return "rotate("+(180+(barwide*3)*i)+", 0, 0)";
			}
		}) 
		.attr("fill","none")	
		.style("stroke-dasharray","1, 4")
		.attr("stroke","lightgrey")
		.attr("stroke-width",.3)
		.attr("height", maxBar);


  	var rectIdentity = gid.selectAll('.rectID')
		.data(d => d.children)
		.join('rect')
		.attr("class",function(d,i){
			idVals.push(d.total);
			return "rectID";
		})
		.attr("width",function(d,i){
			if(d.q=="years" && yearsRadius>0){
				return widthScale(yearsMax);			
			}
			else{
				return barwide;
			}
		})
		.attr("fill",function(d){
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return "#46AAB3"
			}
			else{
				return "lightgrey"
			}
		}) 
		.attr("stroke", function(d){
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return "yellow"
			}
			else{
				return "none"
			}
		})
		.attr("stroke-width", function(d){
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return .5;
			}
			else{
				return 0;
			}
		})
	    .attr("x", function(d,i){
			if(d.q=="years" && yearsRadius>0){
	    		return originX+(yearsRadius*Math.sin(0));
	    	}else{
		    	return normOriginX;
	    	}
	    })
	    .attr("y", function(d){
			if(d.q=="years" && yearsRadius>0){
	    		return originY+(yearsRadius*Math.cos(0)); 
	    	}else{
		    	return normOriginY;
	    	}
	    })
		.attr("transform", function(d,i){
			if(d.q=="years" && yearsRadius>0){ 
				return "rotate("+(yearScale(i))+", 0, 0)";
			}else{
				return "rotate("+(180+(barwide*3)*i)+", 0, 0)";
			}
		}) 
		.attr("height",0);
	rectIdentity
		.append("title")
      	.text((d) => `${d.name}`)
	maxId = d3.max(idVals);




 	var rectMaxTH = gthe.selectAll('.rectMaxTH')
		.data(d => d.children)
		.join('rect')
		.attr("class", "rectMaxTH")
		.attr("width",function(d,i){
			if(d.q=="years" && yearsRadius>0){
				return widthScale(yearsMax);			
			}
			else{
				return barwide;
			}
		})
		.attr("fill",function(d){
			if(d.name=="space"){
				return "grey"
			}
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return "#46AAB3"
			}
			else{
				return "lightgrey"
			}
		}) 
	    .attr("x", function(d,i){
			if(d.q=="years" && yearsRadius>0){
	    		return originX+(yearsRadius*Math.sin(0));
	    	}else{
		    	return normOriginX;
	    	}
	    })
	    .attr("y", function(d){
			if(d.q=="years" && yearsRadius>0){
	    		return originY+(yearsRadius*Math.cos(0)); 
	    	}else{
		    	return normOriginY;
	    	}
	    })
		.attr("transform", function(d,i){
			if(d.q=="years" && yearsRadius>0){ 
				return "rotate("+(yearScale(i))+", 0, 0)";
			}else{
				return "rotate("+(180+(barwide*3)*i)+", 0, 0)";
			}
		}) 
		.attr("fill","none")	
		.style("stroke-dasharray","1, 4")
		.attr("stroke","lightgrey")
		.attr("stroke-width",.3)
		.attr("height", maxBar)
  	var rectTheme = gthe.selectAll('.rectTHE')
		.data(d => d.children)
		.join('rect')
		.attr("class",function(d){
			theVals.push(d.total);
			return "rectTHE"
		})
		.attr("width", barwide)
		.attr("fill",function(d){
			if(d.value==1 || d.value ==2 || d.value==12 || d.value == 3 || d.value == 123 || d.value == 23 || d.value==13){
				return "#46AAB3"
			}
			else{
				return "lightgrey"
			}
		}) 
	    .attr("x", normOriginX ) 
	    .attr("y", normOriginY )
		.attr("transform", function(d,i){
			return "rotate("+(180+(barwide*3)*i)+", 0, 0)";
		}) 
		.attr("height",0);
	maxTheme = d3.max(theVals);

	if(maxId>0 && maxTheme>0){
		if(maxId>maxTheme){
			maxTotal = maxId;
		}else{
			maxTotal = maxTheme;
		}
	}

	if(maxTotal>0){
		barScale.domain([0, maxTotal]) 
		rectIdentity.transition().duration(4000).attr("height", function(d,i){
			return barScale(d.total);
		})
		rectTheme.transition().duration(4000).attr("height", function(d,i){
			return barScale(d.total);
		})
	}


var zoom = d3.zoom()
  .extent([[0, 0], [width, height]])
  .scaleExtent([1, 8])
  .on("zoom", zoomed);

svg.call(zoom);
svg.on("click", reset);

function zoomed({transform}) {
	svg.attr("transform", transform);
}

function reset() {
	svg.transition().duration(750).call(
	  zoom.transform,
	  d3.zoomIdentity,
	  d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
	);
}

d3.selectAll("text").attr("fill","none")

var valueline =  d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })    
    .curve(d3.curveCatmullRom.alpha(0.5));

svg.append("path")
  .data([idLine])
  .attr("class", "lineID")
  .attr("d", valueline)
svg.append("path")
  .data([themeLine])
  .attr("class", "lineTH")
  .attr("d", valueline)
svg.append("path")
  .data([cnctLine])
  .attr("class", "lineCN")
  .attr("d", valueline)
d3.selectAll("path").attr("fill","none").attr("stroke","lightgrey")
  .style("stroke-dasharray", ("1,4"))
  .style("stroke-width", 1)
d3.selectAll("circle").attr("stroke-width",.3)
})