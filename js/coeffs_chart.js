(function(){

var margin = {top: 20, right: 30, bottom: 40, left: 95},
    width = 760 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svg = d3.select("#coeffschartarea").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../data/coeffs.csv", type, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.Values; })).nice();
  y.domain(data.map(function(d) { return d.Feature; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.Values < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.Values)); })
      .attr("y", function(d) { return y(d.Feature); })
      .attr("width", function(d) { return Math.abs(x(d.Values) - x(0)); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
});

function type(d) {
  d.Values = +d.Values;
  return d;
}

}());
