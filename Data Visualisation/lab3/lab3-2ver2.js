var dataset = [
    [2,8,5], [3,5,5], [5,17,10],
    [6,6,5], [6,12,6], [7,20,3],
    [8,22,10], [10,11,5], [5,12,5],
    [6,16,10] ];

var w = 800; // define the width of the svg
var h = 300; // define the height of the svg
var padding = 40; // define padding

var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[0]; }),
             d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding - 120]);

var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d[1]; }),
             d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(10);

var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(4);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d[0]); })
    .attr("cy", function(d) { return yScale(d[1]); })
    .attr("r", function(d) { return d[2]; })
    .attr("fill", "rgb(49, 145, 0)");

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
    .attr("transform", "translate(0, " + (h - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);

// X axis label:
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", w / 2)  // Adjust to use 'w' for width
    .attr("y", h - 10) // Adjust to use 'h' for height
    .text("Tree Age (years)")
    .attr("font-size", "12px");

// Y axis label:
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)  // Adjusted Y position
    .attr("x", -h / 2) // Adjust X to match 'h'
    .text("Tree Height (m)")
    .attr("font-size", "12px");
