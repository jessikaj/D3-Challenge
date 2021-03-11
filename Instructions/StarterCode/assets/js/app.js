// @TODO: YOUR CODE HERE!
// set the dimensions and margins of the graph
const margin = {top: 20, right: 50, bottom: 40, left: 50},
    width = (window.innerWidth - margin.left - margin.right) * .75,
    height = window.innerHeight - margin.top - margin.bottom;


var x = d3.scaleLinear().range([0, width*.6]);
var y = d3.scaleLinear().range([height, 0]);

    // define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + width/3 + "," + margin.top + ")");



d3.dsv(",", "../assets/data/data.csv", function(d){
    _log(d);
    return {
            abbr: d.abbr,
            age: +d.age,
            ageMoe:  +d.ageMoe,
            healthcare: +d.healthcare,
            healthcareHigh: +d.healthcareHigh,
            healthcareLow: +d.healthcareLow,
            id: +d.id,
            income: +d.income,
            incomeMoe: +d.incomeMoe,
            obesity: +d.obesity,
            obesityHigh: +d.obesityHigh,
            obesityLow: +d.obesityLow,
            poverty: +d.poverty,
            povertyMoe: +d.povertyMoe,
            smokes: +d.smokes,
            smokesHigh: +d.smokesHigh,
            smokesLow: +d.smokesLow,
            state: d.state
    }; 
}).then(data=> {

    // ---- healthcare vs poverty ------ ---- ---- 
        // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.poverty; }));
    y.domain([0, d3.max(data, function(d) { return d.healthcare; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);
      
    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("fill", "lightblue")
        .attr("stroke", "lightblue")
        .attr("r", 14)
        .attr("cx", function(d) { return x(d.poverty); })
        .attr("cy", function(d) { return y(d.healthcare); })

    svg.selectAll("dot")
    .data(data)
    .enter()
        .append("text")
        .text((d) =>d.abbr )
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("x", function(d) { return x(d.poverty)-10; })
        .attr("y", function(d) { return y(d.healthcare)+5; })

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height  + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

        // Add the X label
    svg.append("text")
    .attr("transform", `translate(${width/3},${height+margin.bottom/1.5})`)
    .text("In Poverty (%)"); 
    
    // Add the Y label
    svg.append("text")
    .attr("transform", `translate(-${margin.right},${height/2 + margin.top}) rotate(-90)`)
    .text("Lacks Healthcare (%)"); 

    _log(data); 
});


const _log = (obj) => {
    console.log(obj); 
}