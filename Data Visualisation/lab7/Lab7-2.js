function init() {
    var w = 300;
    var h = 300;
    var dataset = [5, 10, 20, 45, 6, 25]

    var outerRadius = w/2;
    var innerRadius = 0;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius)
               

    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

     // Create SVG container
     var svg = d3.select("#chart")
     .append("svg")
     .attr("width", w)
     .attr("height", h);

    //set up groups
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    //Draw Arc Paths
    arcs.append("path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d",function(d,i){
        return arc(d,i);
    });

    //Labels
    arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });

}

window.onload = init;