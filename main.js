const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME2 = d3.select("#vis5")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

function build_barchart() {
    console.log('a');

    d3.csv("data/data.csv").then((data) => {

        console.log(data);

        const MAX_Y2 = d3.max(data, (d) => {return parseInt(d.Value); });

        const X_SCALE2 = d3.scaleBand()
                            .domain(data.map((d) => {return d.Category}))
                            .range([0, VIS_WIDTH]);

        const Y_SCALE2 = d3.scaleLinear()
                            .range([VIS_HEIGHT, 0])
                            .domain([0, MAX_Y2])

        console.log(MAX_Y2);

        FRAME2.selectAll(".bar")
                        .data(data)
                        .enter()
                            .append("rect")
                                    .attr("x", d => {
                                            return X_SCALE2(d.Category) + MARGINS.left
                                        })
                                    .attr("y", d => {
                                        return (Y_SCALE2(d.Value) + MARGINS.bottom)
                                    })
                                    .attr("width", X_SCALE2.bandwidth() - 5)
                                    .attr("height", d => {
                                        return (VIS_HEIGHT - Y_SCALE2(d.Value))
                                    })
                                    .attr("fill", "seagreen");

        FRAME2.append("g")
                .attr("transform", "translate(" + 
                    MARGINS.left+ "," + (MARGINS.top + VIS_HEIGHT) + ")")
                    .call(d3.axisBottom(X_SCALE2).ticks(10));

        FRAME2.append("g")
                .attr("transform", "translate(" + 
                    MARGINS.left + "," + (MARGINS.top) + ")")
                .call(d3.axisLeft(Y_SCALE2).ticks(10));

    });
}

build_barchart();