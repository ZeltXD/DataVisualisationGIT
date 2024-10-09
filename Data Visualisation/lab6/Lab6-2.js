            // Set up SVG dimensions and dataset
            var w = 500;
            var h = 200;
            var barPadding = 3;
            var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];
            var sortOrder = false;
            var sortBars = function() {
               
                sortOrder = !sortOrder
                svg1.selectAll("rect")
                    .sort(function(a,b){
                        if (sortOrder){
                            return d3.ascending(a,b);
                        }else{
                            return d3.descending(a,b)
                        }       
                    })
                    .transition()
                    .delay(function(d,i){
                        return i * 50;
                    })
                    .duration(1000)
                    .attr("x",function(d,i){
                        return xScale(i);
                    })
                    
                    
                    
                };

            var xScale = d3.scaleBand()
                            .domain(d3.range(dataset.length))
                            .range([0, w])
                            .paddingInner(0.05);

            var yScale = d3.scaleLinear()
                            .domain([0, d3.max(dataset)])
                            .range([0,h])

            // Create SVG container
            var svg1 = d3.select("article.content")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);
            
            // Add an axis using d3.axisBottom() for the x-axis
            var xAxis = d3.axisBottom(xScale);

            svg1.append("g")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            // Draw bars for each data point
            svg1.selectAll("rect")
                .data(dataset)
                .enter()
               
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - (d * 4);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return d * 4;
                })
                .attr("fill", "rgb(106, 90, 205)")  // Set fill color for bars
                
                .on("mouseover",function(event,d){
                    var xPosition = parseFloat(d3.select(this).attr("x"))
                    var yPosition = parseFloat(d3.select(this).attr("y"))
                    d3.select(this)
                    //.append("title")
                    //.text(function(d){
                        //return "This value is " +d;
                    //})
                    .transition()
                    .delay(5)
                    .attr("fill", "orange")
                    svg1.append("text")
                        .attr("id","tooltip")
                        .attr("text-anchor","middle")
                        .attr("x",xPosition + xScale.bandwidth()/2)
                        .attr("y",yPosition+20) 
                        .attr("font-weight", "bold") 
                        .attr("fill", "black")
                        .text(d);
                        
                })
               
                .on("mouseout",function(event,d){
                    d3.select(this)
                    //.append("title")
                    //.text(function(d){
                        //return "This value is " +d;
                    //})
                    .transition()
                    .delay(5)
                    .attr("fill", "rgb(106, 90, 205)")
                    d3.select("#tooltip").remove();
                    
                })
               
                
            


            // Add text labels on bars
            svg1.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("fill", "black")
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("text-anchor", "middle")
                .attr("y", function(d) {
                    return h - (d * 4) - 5;
                })
               

            //adding button
            d3.select("#addingButton").on("click", function(){
                var newNumber = Math.floor(Math.random()* 30);
                dataset.push(newNumber);

                xScale.domain(d3.range(dataset.length));
               

            var bars = svg1.selectAll("rect")
                .data(dataset);

                bars.enter()
                .append("rect")
                .on("mouseover",function(event,d){
                    var xPosition = parseFloat(d3.select(this).attr("x"))
                    var yPosition = parseFloat(d3.select(this).attr("y"))
                    d3.select(this)
                    //.append("title")
                    //.text(function(d){
                        //return "This value is " +d;
                    //})
                    .transition()
                    .delay(5)
                    .attr("fill", "orange")
                    svg1.append("text")
                        .attr("id","tooltip")
                        .attr("text-anchor","middle")
                        .attr("x",xPosition + xScale.bandwidth()/2)
                        .attr("y",yPosition+20)
                        .attr("font-weight", "bold") 
                        .attr("fill", "black")
                        .text(d);
                })
               
                .on("mouseout",function(event,d){
                    d3.select(this)
                    //.append("title")
                    //.text(function(d){
                        //return "This value is " +d;
                    //})
                    .transition()
                    .delay(5)
                    .attr("fill", "rgb(106, 90, 205)")
                    d3.select("#tooltip").remove();
                })

                .attr("x", w)
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .merge(bars)
                .transition()
                .duration(1000)
                .attr("x", function(d,i){
                    return xScale(i);
                })
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d){
                    return yScale(d);
                })
                .attr("fill", "rgb(106, 90, 205)")
            });

       

             //removing button
             d3.select("#removingButton").on("click", function(){
                dataset.shift()
                xScale.domain(d3.range(dataset.length));
                

            var bars = svg1.selectAll("rect")
                .data(dataset);

            svg1.selectAll("rect")
                .transition()
                .duration(1000)
                .attr("x", function(d,i){
                    return xScale(i);
                })
                .attr("y", function(d){
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d){
                    return yScale(d);
                })
                
                
                bars.exit()
                    //.transition()
                    //.duration(500)
                    .attr("x",w)
                    .remove();
            });

            d3.select("#sort").on("click", function(){ 
                sortBars()
            });
    




            


              
                