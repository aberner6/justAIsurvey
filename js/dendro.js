
// set the dimensions and margins of the graph


var div = document.getElementById("dataviz1");
var rect = div.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  width = rect.width;
  height = rect.height;
var radius = width / 2;
// var keySVG = d3.select("#my_dataviz").append("svg").attr("width",200).attr("height",100)
// .attr("transform","translate(" + (width+100) + ","+(20)+")");

// append the svg object to the body of the page
var svg = d3.select("#dataviz1")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + (radius) + "," + (radius) + ")");

// var stratify = d3.tree()
//   .size([Math.PI*2, radius])
//   .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)

var stratify = d3.cluster().size([2 * Math.PI, radius - 100])

var identityNames = ["ethicist","funding","education","career path","years","according to self","according to others"]
var themeNames = ["topics","domain","outputs","audiences","type","field",""]

var themeColors1 = ["#f768a1"]
var themeColors2 = ["#c51b8a"]
var themeColors3 = ["#7a0177"]
var themeColors4 = ["#b582b2"]




var idColors = ["#81bac7"]
var idColorScale = d3.scaleOrdinal()
  .domain(identityNames)
  .range(idColors)
var themeColorScale = d3.scaleOrdinal()
  .domain(themeNames)
  .range(themeColors1)
var themeColorScale2 = d3.scaleOrdinal()
  .domain(themeNames)
  .range(themeColors2)
var themeColorScale3 = d3.scaleOrdinal()
  .domain(themeNames)
  .range(themeColors3)
var themeColorScale4 = d3.scaleOrdinal()
  .domain(themeNames)
  .range(themeColors4)
// read json data
d3.json("data_dendrogram.json").then(function(data) {

  var sortData = d3.hierarchy(data)
  console.log(sortData)


  var root = stratify(sortData)
  console.log(root);

  svg.append("g")
      .attr("fill", "none")
      .attr("class","thedraw")
      // .attr("stroke", "#555")
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("class", "drawing")
      .attr("stroke-opacity", function(d){
        if(d.target.data.value!=undefined && d.target.data.value!=1 && d.target.data.value!=2 && d.target.data.value!=3 && d.target.data.value!=12){
          return .3
        }else{
          return .4
        }
      })
      .attr("stroke-width", function(d){
        if(d.target.data.value!=undefined && d.target.data.value!=1 && d.target.data.value!=2 && d.target.data.value!=3 && d.target.data.value!=12){
          return .5
        }else{
          return 1.5
        }
      })
      .attr("d", d3.linkRadial()
          .angle(function(d){
            return d.x
          })
          .radius(function(d){
            return d.y
          })
        )
      .attr("stroke", function(d){
        if(d.source.data.name=="identity"){
          console.log(d);
          return "#819ec7"
        }
        if(d.target.data.value==1){
          for(i=0; i<identityNames.length; i++){
            if(d.source.data.name==identityNames[i]){
              return idColorScale(d.source.data.name)
            }
            if(d.source.data.name==themeNames[i]){
              return themeColorScale(d.source.data.name)
            }
          }
        } 
        if(d.target.data.value==2){
          for(i=0; i<identityNames.length; i++){
            if(d.source.data.name==themeNames[i]){
              return themeColorScale2(d.source.data.name) //adjust so it is a darker scale of same colors
            }
          }
        }
        if(d.target.data.value==12){
          console.log(themeColorScale3(d.source.data.name) )
          for(i=0; i<identityNames.length; i++){
            if(d.source.data.name==themeNames[i]){
              return themeColorScale3(d.source.data.name) 
            }
          }
        }
        if(d.target.data.value==3){
          console.log(themeColorScale3(d.source.data.name) )
          for(i=0; i<identityNames.length; i++){
            if(d.source.data.name==themeNames[i]){
              return themeColorScale4(d.source.data.name) 
            }
          }
        }
        if(d.source.data.name=="theme"){
          return "#fbb4b9"
        }

        else{
          return "lightgrey"
        }
      });

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
          if(d.data.total){
            console.log(d.data.total)
          }
          return "white"
         })
        .attr("opacity", .7)
        .attr("r", 2.5)
        .attr("class", function(d){
          console.log(d.data.name)
          return d.data.name;
        })

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      // .filter(function(d){
        // return 0;
        // return d.data.value>0 || d.children;
      // })
        .attr("transform", d => `
          rotate(${d.x * 180 / Math.PI - 90}) 
          translate(${d.y},0) 
          rotate(${d.x >= Math.PI ? 180 : 0})
        `)
        .attr("dy", "0.31em")
        // .attr("dy", "-0.9em")
        .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
        .attr("fill", function(d){
          // if(d.children){
          //   return "grey"
          // }
          // if(!d.children){
            // return "lightgrey"
          // }
          return "lightgrey";
        })
        .text(d => d.data.name)
      .clone(true).lower()
        // .attr("stroke", "white");      

})