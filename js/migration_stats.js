var listOfEmigration = [];
var listOfYears = [];

var maxEmigration = 0;
var minEmigration = migrationStats[0].Emigration;

for (var i = 0; i < migrationStats.length; i++){

	listOfEmigration[i] = migrationStats[i].Emigration;
	listOfYears[i] = migrationStats[i].Year;

	//Checks for the maximum number of emigration
	if (migrationStats[i].Emigration > maxEmigration){
		maxEmigration = migrationStats[i].Emigration;
	}
	//Checks for the minimum number of emigration
	if (migrationStats[i].Emigration < minEmigration){
		minEmigration = migrationStats[i].Emigration;
	}
}



var svgWidth = 1420;
var svgHeight = 400;
var dataset = listOfEmigration;


//Scales the bars in the graph
var yScale = d3.scaleLinear()
	.domain([minEmigration,maxEmigration])
	.range([45,390]);

//Creates a svg that will contain the chart
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar-chart");


var barPadding = 5;
var barWidth = (svgWidth / dataset.length);

//Creates the rectangles within the chart
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - yScale(d);
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    })
    //When hovering over with the mouse over each bar
	.on('mouseover', function(d, i){
		console.log(d);
		//This text is appended to a div and displayed on the website along with the respective year of that bar
		var htmlString = "<p>The number of people who emigrated in "+datasetYears[i] + " is " + d+ "</p>";
		$('#migration-text').html(htmlString);
		//The bar changes color
		d3.select(this).attr("r", 10).style("fill", "rgb(77,5,5)");

	})
	//When not hovering anymore the color goes back to grey
	.on('mouseout', function(d) {
		d3.select(this).attr("r", 5.5).style("fill", "grey");
	});



var datasetYears = listOfYears;

//Add text to the page
var curX, curY;
svg.selectAll("text")
	.data(datasetYears)
	.enter()
	.append("text")
	.text(function(d) {
		return d;
	})
	.attr("text-anchor", "middle")
    .attr("transform", function(d, i) {
    	//Setting the current x and y position of the text
    	var curX = i * (svgWidth / datasetYears.length) + (svgWidth / datasetYears.length - barPadding) / 2 + 6;
    	var curY = svgHeight - datasetYears.length + 5;
    	//Rotating these positions by 90 degrees to have the text appear vertically
    	return "translate(" + curX + "," + curY +") rotate(-90)";       
    })
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	.attr("font-weight", "bold")
	.attr("fill", "black");

console.log(datasetYears);

