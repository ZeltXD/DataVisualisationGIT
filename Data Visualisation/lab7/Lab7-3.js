function init(){
    //Width and height
			var w = 300;
			var h = 300;

			//Original data
			var dataset = [
				{ apples: 5, oranges: 10, grapes: 22 },
				{ apples: 4, oranges: 12, grapes: 28 },
				{ apples: 2, oranges: 19, grapes: 32 },
				{ apples: 7, oranges: 23, grapes: 35 },
				{ apples: 23, oranges: 17, grapes: 43 }
			];

			//Set up stack method
			var stack = d3.stack()
						  .keys([ "apples", "oranges", "grapes" ])
						  .order(d3.stackOrderDescending);  //Flipped stacking order

			//Data, stacked
			var series = stack(dataset);

			//Set up scales
			var xScale = d3.scaleBand()
				.domain(d3.range(dataset.length))
				.range([0, w])
				.paddingInner(0.05);
		
			var yScale = d3.scaleLinear()
				.domain([0,				
					d3.max(dataset, function(d) {
						return d.apples + d.oranges + d.grapes;
					})
				])
				.range([h, 0]);  //Flipped vertical scale
				
			
			var colors = d3.scaleOrdinal(d3.schemeCategory10);
		
			//Create SVG element
			var svg = d3.select("#chart")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
	
			// Add a group for each row of data
			var groups = svg.selectAll("g")
				.data(series)
				.enter()
				.append("g")
				.style("fill", function(d, i) {
					return colors(i);
				});
	
			// Add a rect for each data value
			var rects = groups.selectAll("rect")
				.data(function(d) { return d; })
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d) {
					return yScale(d[1]);  //Changed y value
				})
				.attr("height", function(d) {
					return yScale(d[0]) - yScale(d[1]);  //Changed height value
				})
				.attr("width", xScale.bandwidth());

				// select the svg areas

				// create a list of keys
				var keys = ["Apple", "Orange", "Grape"]

				// Usually you have a color scale in your chart already

				// Add one dot in the legend for each name.
				svg.selectAll("mydots")
				.data(keys)
				.enter()
				.append("circle")
					.attr("cx",50)
					.attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
					.attr("r", 7)
					.style("fill", function(d, i){ return colors(i)})

				// Add one dot in the legend for each name.
				svg.selectAll("mylabels")
				.data(keys)
				.enter()
				.append("text")
					.attr("x", 70)
					.attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
					.style("fill", function(d,i){ return colors(i)})
					.text(function(d){ return d})
					.attr("text-anchor", "left")
					.style("alignment-baseline", "middle")
			}
window.onload = init;
