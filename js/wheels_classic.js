var div = document.getElementById("dataviz2");
var rect = div.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

var leftMargin = 100;
var topMargin = leftMargin;

var svg = d3.select("#dataviz2")
	.append("svg")
	.attr("width",width)
	.attr("height",height)
    .attr("viewBox", [0, 0, width, height])

var g = svg.append("g");

var sdata;
var figDepth = 3;
var outerCircleRadius = (width/6.5)/figDepth; 
var centerEX = width/figDepth;
var centerEH = height/figDepth;
var smallMarg = outerCircleRadius/4;
var innerCircRad = outerCircleRadius/1.5;

var idColors = ["#4EA8BA","#4EA8BA","#46AAB3","#7B9FE3","#9A99FF","#65A4CF"] 
var idNames = ["self-ethicist","others-ethicist","funding","years in field","education","career path"]
var themeColors = ["#CB99CC","#FFCC9A","#D360D5","#D66B6E","#EB9C84","#E996B8","#D466A2","#CB99CC"]
var themeNums = [0,1,2,3,12,23, 13, 123]
var strokeHighlight = .5;
var strokeNormal = .2;
var strokeMin = .1;

var colID = d3.scaleOrdinal()
	.domain(idNames)
	.range(idColors);
var colTHEME = d3.scaleOrdinal()
	.domain(themeNums)
	.range(themeColors);

var posID = [
	{
		"x":centerEX,
		"y":centerEH-outerCircleRadius,
		"rot":30,
		"id":"self-ethicist"
	},
	{
		"x":centerEX-5,
		"y":centerEH-outerCircleRadius-smallMarg/2,
		"rot":330,
		"id":"others-ethicist"
	},
	{
		"x":centerEX+outerCircleRadius,
		"y":centerEH-smallMarg,
		"rot":135,
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
var idLine = [posID[5],posID[1],posID[0],posID[2],posID[3],posID[4]]
var themeLine = [posTh[5],posTh[4],posTh[0],posTh[1],posTh[2],posTh[3]]
var cnctLine = [posID[0],posTh[0]];

var originX = 0;
var originY = 0;

//CHANGES HERE: CAREFUL!
//also changed spacing of space out of bars
var normOriginX = originX + (innerCircRad * Math.sin(0));
var normOriginY = originY + (innerCircRad * Math.cos(0));

var idVals = [];
var theVals = [];
var maxTotal = 0;
var maxTheme, maxId = 0;
var maxBar = innerCircRad*2//outerCircleRadius*2-innerCircRad;
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

	var gid = g.selectAll(".gID")
		.data(sdata[0].children)
		.join("g")
		.attr("class", function(d,i){
			return d.name+posID[i].id;
		})
		.attr('transform', function(d,i){ 
			console.log(i);
			return `translate(${posID[i].x}, ${posID[i].y}), rotate(${posID[i].rot},0,0)` 
		});

	var idText = gid.append('text')
		.attr("class", "idText")
		.attr('font-size', 6)
		.attr('font-family', 'sans-serif')
		.attr('x', 0)
		.attr('y', 0)
		.attr('transform', function(d,i){ 
			return `rotate(${-posID[i].rot},0,0)` 
		})
		.attr("fill","white")
		.text(d => d.name);

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

	var gthe = g.selectAll(".gTHE")
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
		.attr("stroke",function(d){
			// if(d.value==1){
				return colID(d.parent);
			// }
			// else{
				// return "lightgrey"
			// }
		})
		.attr("stroke-width",strokeMin)
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
		.attr("fill", function(d){
			if(d.value==1){
				return colID(d.parent);
			}
			else{
				return "none"
			}
		})
		.attr("stroke", function(d){
			return colID(d.parent);
		})
		.attr("stroke-width", function(d){
			if(d.value==1){
				return strokeHighlight;
			}
			else{
				return strokeNormal;
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
		.attr("fill","none")
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
		.attr("stroke",function(d){
			// if(d.value>0){
				return colTHEME(d.value);
			// }
			// else{
				// return "lightgrey"
			// }
		})
		.attr("stroke-width",strokeMin)
		.attr("height", maxBar)
  	var rectTheme = gthe.selectAll('.rectTHE')
		.data(d => d.children)
		.join('rect')
		.attr("class",function(d){
			theVals.push(d.total);
			return "rectTHE"
		})
		.attr("width", barwide)
		.attr("stroke",function(d){
			return colTHEME(d.value);
		})
		.attr("fill", function(d){
			if(d.value>0){
				return colTHEME(d.value);
			}
			else{
				return "none"
			}
		})
	    .attr("x", normOriginX ) 
	    .attr("y", normOriginY )
		.attr("transform", function(d,i){
			return "rotate("+(180+(barwide*3)*i)+", 0, 0)";
		}) 
		.attr("height",0)
		.attr("stroke-width", function(d){
			if(d.value==1){
				return strokeHighlight;
			}
			else{
				return strokeNormal;
			}
		});
	maxTheme = d3.max(theVals);

//THIS SHOULD BE TOTAL NUM RESPONDENTS SO FAR
maxTotal = sdata[2].responses;
	// if(maxId>0 && maxTheme>0){
	// 	if(maxId>maxTheme){
	// 		maxTotal = maxId;
	// 	}else{
	// 		maxTotal = maxTheme;
	// 	}
	// }

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

svg
	.call(zoom)
	// .attr("transform",`translate(${0}, ${0})`) 


svg.on("click", reset);

function zoomed({transform}) {
    // const {transform} = event;
    g.attr("transform", transform);
	// svg.attr("transform", transform);
}

function reset() {
	svg.transition().duration(750).call(
	  zoom.transform,
	  d3.zoomIdentity,
	  d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
	);
}



var valueline =  d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })    
    .curve(d3.curveCatmullRom.alpha(0.5));

g.append("path")
  .data([idLine])
  .attr("class", "lineID")
  .attr("d", valueline)
g.append("path")
  .data([themeLine])
  .attr("class", "lineTH")
  .attr("d", valueline)
g.append("path")
  .data([cnctLine])
  .attr("class", "lineCN")
  .attr("d", valueline)
d3.selectAll("path").attr("fill","none").attr("stroke","lightgrey")
  .style("stroke-dasharray", ("1,4"))
  .style("stroke-width", 1)
d3.selectAll("circle").attr("stroke-width",.3)
})