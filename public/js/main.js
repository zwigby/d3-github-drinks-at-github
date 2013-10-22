tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

var width = 960,
    height = 600,
    radius = Math.min(width, height) / 2,
    labelr = radius - 5;

var colors = [
  '#F2049F',
  '#1AA2D8',
  '#8EBF26',
  '#F28A0C',
  '#D80404',
  '#9726BF'
];

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.value; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 150)
    .outerRadius(radius - 20);

var svg = d3.select(".pie-graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var drinks = [
  { name : 'Gin and Tonic', value : 10 },
  { name : 'Hard Lemonade', value : 30 },
  { name : 'Stella', value : 20 },
  { name : 'PBR', value : 52 },
  { name : 'Cabernet', value : 13 },
  { name : 'Chardonnay', value : 26 }
];

var arcs = svg.datum(drinks).selectAll("path")
    .data(pie)
    .enter();

    arcs.append("path")
    .attr("fill", function(d, i) { return colors[i]; })
    .attr("d", arc)
    .on('mouseover', function(d, i) {
        d3.select(this).attr('fill', d3.rgb(colors[i]).brighter(0.5));
    })
    .on('mouseout', function(d, i) {
        d3.select(this).attr('fill', colors[i]);
    });

    arcs.append("svg:text")
    .attr('class', 'pie-label')
    .attr("transform", function(d) {
        var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            // pythagorean theorem for hypotenuse
            h = Math.sqrt(x*x + y*y);
        return "translate(" + (x/h * labelr) +  ',' +
           (y/h * labelr) +  ")";
    })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle)/2 > Math.PI ?
            "end" : "start";
    })
    .text(function(d, i) {
      return d.data.name;
    });

// function change() {
//   var value = this.value;
//   clearTimeout(timeout);
//   pie.value(function(d) { return d[value]; }); // change the value function
//   path = path.data(pie); // compute the new angles
//   path.attr("d", arc); // redraw the arcs
// }