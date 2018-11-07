

// function setup() {

//   //var data = populationStats;
//   var width = 2100, // canvas width and height
//       height = 3350,
//       margin = 20,
//       w = width - 2 * margin, // chart area width and height
//       h = height - 2 * margin;
  
//   var barWidth =  (h / populationStats.length) * 0.8; // width of bar
//   var barMargin = (h / populationStats.length) * 0.2; // margin between two bars
  
//   createCanvas(width, height);
  
//   textSize(14);
  
//   push();
//   translate(margin, margin); // ignore margin area
  
//   for(var i = 0; i < populationStats.length; i++) {
//     push();
//     fill(178, 128, 135);
//     noStroke();
//     translate(0, i * (barWidth + barMargin)); // jump to the top right corner of the bar
//     rect(0, 0, map(populationStats[i].Population, 1596131, 2668140, 100, 500), barWidth); // draw rect
//     console.log(populationStats[i].Population);
//     //console.log(barWidth);

//     fill(255,255,255);
//     text(populationStats[i].Year, 5, barWidth/2 + 5); // write data

//     pop();
//   }
  
//   pop();
// }


var listOfPopulations = [];
var listOfYears = [];
var maxPopulation = 0;
var minPopulation = populationStats[0].Population;

for (var i = 0; i < populationStats.length; i++) {

	listOfPopulations[i] = populationStats[i].Population;
	listOfYears[i] = populationStats[i].Year;
	//console.log(listOfYears[i]);

	if (populationStats[i].Population > maxPopulation){
		maxPopulation = populationStats[i].Population;
	}
	if (populationStats[i].Population < minPopulation){
		minPopulation = populationStats[i].Population;
	}
}


var svgWidth = 1420;
var svgHeight = 400;
var dataset = listOfPopulations;




var yScale = d3.scaleLinear()
		.domain([minPopulation,maxPopulation])
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

		// var htmlString = "<p>The population size is " + d+ "</p>";
		var htmlString = "<p>The population size in "+datasetYears[i] + " is " + d+ "</p>";
		$('#population-text').html(htmlString);
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
	// .attr("x", function(d, i) {
	// 	curX = i * (svgWidth / datasetYears.length) + (svgWidth / datasetYears.length - barPadding) / 2;
	// 	return  curX;
	// })
	// .attr("y", function(d) {
	// 	curY = svgHeight - datasetYears.length + 70;
	// 	// curY = svgHeight + dataset.length;
	// 	return curY;
	// })
    .attr("transform", function(d, i) {
       // return "rotate(-65)";
       var curX = i * (svgWidth / datasetYears.length) + (svgWidth / datasetYears.length - barPadding) / 2 + 4.5;
       var curY = svgHeight - datasetYears.length + 60;
       return "translate(" + curX + "," + curY +") rotate(-90)";       
    })
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("font-weight", "bold")
	.attr("fill", "black");



console.log(datasetYears);





















