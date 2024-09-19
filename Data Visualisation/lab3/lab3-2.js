var w = 800;
var h = 300;
var padding = 30;






var dataset = [
[5, 20, 5], [500, 90, 5], [250, 50, 10],
[100, 33, 5], [330, 95, 6], [410, 12, 3],
[475, 44, 10], [25, 67, 5], [85, 21, 5],
[220, 88, 10] ];

 

 var xScale = d3.scaleLinear() //linear scaling for x value
              
                 .domain([d3.min(dataset,function(d){
                     return d[0];
                 }),
                 d3.max(dataset,function(d){
                     return d[0];
                 })])
                 .range([padding,w-padding-120])

 var yScale = d3.scaleLinear() //linear scaling for the y value
             
                 .domain([d3.min(dataset,function(d){
                     return d[1];
                 }),
                 d3.max(dataset,function(d){
                     return d[1];
                 })])
                 .range([h- padding ,padding]);
                 
                
 
 var svg = d3.select("body") 
             .append("svg")
             .attr("width",w)
             .attr("height",h)

var xAxis = d3.axisBottom() //to set the scale between each number for the X axis
                 .scale(xScale)
                 .ticks(10);

var yAxis = d3.axisLeft() //to set the scale between each number for the Y axis
                 .scale(yScale)
                 .ticks(4);


            
            

 svg.selectAll("circle") // to create the circle 
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return xScale(d[0]); })
     .attr("cy", function(d) { return yScale(d[1]); })
     .attr("r", function(d) { return d[2]; })
     .attr("fill", function(d) { return d[0] === 500 ? "red" : "rgb(49, 145, 0)"; });

 svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function(d) { return d[0] + "," + d[1]; })
     .attr("x", function(d) { return xScale(d[0]) + 10; })
     .attr("y", function(d) { return yScale(d[1]) - 1; })
     .attr("fill", "green");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " +(h - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);
