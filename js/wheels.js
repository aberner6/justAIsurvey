var div = document.getElementById("my_dataviz");
var rect = div.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  width = rect.width;
  height = rect.height;

var radius = width / 2;

var svg = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
    .attr("transform", "translate(" + (radius) + "," + (radius) + ")");
var stratify = d3.cluster().size([2 * Math.PI, radius - 100])

d3.json("data_dendrogram.json").then(function(data) {
	
	sortData = d3.hierarchy(data);
	var root = stratify(sortData);

	console.log(root);

	svg.append("g")
	  .selectAll("circle")
	  .data(root.descendants())
	  .join("circle")
	  .filter(function(d){
	    return d.data.value>0;
	  })
	    .attr("transform", d => `
	      rotate(${d.x * 180 / Math.PI - 90})
	      translate(${d.y},0)
	    `)
	    .attr("fill", function(d){
	      "grey"
	     })
	    .attr("opacity", .7)
	    .attr("r", 2.5);



//make it using the path but do it as a rect and then only go so far as you should
  svg.append("g")
    .selectAll("rect")
    .data(root.links())
    .join("rect")
    // .filter(function(d){
    // 	return d.target.data.value > 0;
    // })
      .attr("stroke","grey")
	    .attr("width",1)
	    .attr("fill", function(d){
	      "grey"
	     })
	    .attr("opacity", .7)
	    // .attr("transform", d => `
	    //   rotate(${d.target.x * 180 / Math.PI - 90})
	    //   translate(${d.source.y},0)
	    // `)
	    .attr("transform", d => `
	      rotate(${d.target.x * 180 / Math.PI - 90})
	      translate(0,${d.source.y})
	    `)

	    .attr("x", 0)
	    // 	function(d){
	    // 	return d.target.x - (d.target.data.value*100)
	    // })
	    .attr("y",0)
	    	// function(d){
	    	// return d.source.y;
	    // })
	    .attr("height", function(d){
	    	if(d.target.data.value>=0){
	    		// console.log(d.target.data.value)
		    	// return d.source.y - (d.target.data.value*100)	    		
		    	return 1+(d.target.data.value*50)	    		
	    	}else{
	    		return 0;
	    	}
	    })



	// svg.append("g")
	//   .selectAll("rect")
	//   .data(root.descendants())
	//   .join("rect")
	//   .filter(function(d){
	//     return d.data.value>0;
	//   })
	//     .attr("transform", d => `
	//       rotate(${d.x * 180 / Math.PI - 90})
	//       translate(${d.y},0)
	//     `)
	//     .attr("width",1)
	//     .attr("height", 10)
	//     .attr("fill", function(d){
	//       "grey"
	//      })
	//     .attr("opacity", .7)
})



















	// svg.append("g")
	// 	.selectAll("rect")
	// 	.data(sortData.descendants())
	// 	.join("rect")
	// 	.filter(function(d){
	// 		return d.data.total //return those that have a data value
	// 	})
	// 	.attr("x", function(d,i){
	// 		//this should be scaled
	// 		return width/2+(10*i);
	// 	})
	// 	.attr("y", height/2)
	// 	.attr("width",1)
	// 	.attr("height",function(d){
	// 		//this should be scaled
	// 		return height/2-(d.data.total*10);
	// 	})
	// 	.attr("stroke","black")