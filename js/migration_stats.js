var listOfEmigration = [];
var listOfYears = [];

var maxEmigration = 0;
var minEmigration = migrationStats[0].Emigration;

for (var i = 0; i < migrationStats.length; i++){

	listOfEmigration[i] = migrationStats[i].Emigration;
	listOfYears[i] = migrationStats[i].Year;

	if (migrationStats[i].Emigration > maxEmigration){
		maxEmigration = migrationStats[i].Emigration;
	}
	if (migrationStats[i].Emigration < minEmigration){
		minEmigration = migrationStats[i].Emigration;
	}
}



var svgWidth = 1420;
var svgHeight = 400;
var dataset = listOfEmigration;


var yScale = d3.scaleLinear()
		.domain([minEmigration,maxEmigration])
		.range([40,390]);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "bar-chart");


var barPadding = 5;
var barWidth = (svgWidth / dataset.length);

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
	.on('mouseover', function(d, i){
		console.log(d);

		var htmlString = "<p>The number of people who emigrated in "+datasetYears[i] + " is " + d+ "</p>";
		$('#migration-text').html(htmlString);
		d3.select(this).attr("r", 10).style("fill", "rgb(77,5,5)");

	})
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
       // return "rotate(-65)";
       var curX = i * (svgWidth / datasetYears.length) + (svgWidth / datasetYears.length - barPadding) / 2 + 6;
       var curY = svgHeight - datasetYears.length + 5;
       return "translate(" + curX + "," + curY +") rotate(-90)";       
    })
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	.attr("font-weight", "bold")
	.attr("fill", "black");

console.log(datasetYears);

