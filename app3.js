// FETCH FUNCTION ////////////////////////////////////////////////////////////////////////////////////////////
// Create a global variable which will allow us to use the API's information throught
let soccerData;
// Fetch the data from our API
function fetch_all(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/').then(data=>{
    data.json().then(d => {
        soccerData = d.Result;
        // we need a callback here since we can't operate the rest of our page until we have gotten our data
        callback();
    })
});
}

// INIT FUNCTION ////////////////////////////////////////////////////////////////////////////////////////////
function init() {
    // GK dropdown
    var dropdownMenu = d3.select("#selDatasetGK");
    var GKdata=soccerData.filter(player => player.Position === "GK");
    GKdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // DEF dropdown
    var dropdownMenu = d3.select("#selDatasetDEF");
    var DEFdata=soccerData.filter(player => player.Position === "DEF");
    DEFdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // MID dropdown
    var dropdownMenu = d3.select("#selDatasetMID");
    var MIDdata=soccerData.filter(player => player.Position === "MID");
    MIDdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // FWD dropdown
    var dropdownMenu = d3.select("#selDatasetFWD");
    var FWDdata=soccerData.filter(player => player.Position === "FWD");
    FWDdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
};

// GETDATA FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////

// Create an array to hold our team positions
var selArr = ["#selDatasetGK", "#selDatasetDEF", "#selDatasetMID", "#selDatasetFWD"];
// initialize an object to hold our getData() functions
var getDataFunctions = {};
// Loop to create a dictionary of functions
for(let i = 0; i < selArr.length; i++){
    getDataFunctions[selArr[i]] = function(){
        // Select the dropdown menu
        var dropdownMenu = d3.select(selArr[i]);
        // Assign the value of the dropdown menu option to a variable
        var subject_selection = dropdownMenu.property("value");
        // Use D3.json() to fetch and read the JSON file
        var filtered_data = soccerData.filter(player => player.Name === subject_selection);
        // Finally, select the unordered list element
        var list = d3.select("ul"); 
        // remove any info from the list
        list.html("");
        // THIS IF STATEMENT CAN BE REMOVED IF WE AREN'T USING THE FLAG AND PLAYER IMAGES
        Object.keys(filtered_data[0]).forEach(attribute => {
            if (attribute == "//Position" ||
                attribute == "Flag" ||
                attribute == "Photo") { 
                // pass
            } else {
            // append info to the unordered list
            list.append("li")
                .text(`${attribute}\t ${filtered_data[0][attribute]}`)
            }
        });
    };
}

// BUTTON FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////

// Create an array to hold our team positions
var posArr = ["GK", "DEF1", "DEF2", "DEF3", "DEF4", "MID1", "MID2", "MID3", "MID4", "FWD1", "FWD2"];
// initialize an object to hold our add functions
var addFunctions = {};
// initialize an object to hold our delete functions
var delFunctions = {};
// initialize an object to hold our team players' information
var spider_dict = {};

// ADD BUTTONS 
for(let i = 0; i < posArr.length; i++){
    addFunctions[posArr[i]] = function(){
        var pos = posArr[i]
        var trow = d3.select(`#${pos}`);
        spider_dict[pos] = {};
        trow.html("");
        var initialcell = trow.append("td");
        initialcell.text(pos);
        d3.selectAll("li").each(function(d,i){
            var text = d3.select(this).text();
            var attribute=text.split("\t")[0];
            var skill=text.split("\t")[1];
            var cell=trow.append("td");
            cell.text(skill);
            spider_dict[pos][attribute] = skill;
        })
    };
}

// DELETE BUTTONS
for(let i = 0; i < posArr.length; i++){
    delFunctions[posArr[i]] = function(){
        var pos = posArr[i]
        var trow = d3.select(`#${pos}`);
        trow.html("");
        var initialcell = trow.append("td");
        initialcell.text(pos);
        delete spider_dict[pos];
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function spiderBuilder(){
    var positions = [" FWD"," MID", " DEF", " GK"]
    overall_list = []
    positions.forEach(
        function(position, index) {
            var total = 0
            position_list = Object.values(spider_dict).filter(row => row.Position === position)
        console.log(total)
        if (position_list.length > 0) 
            {
                for (var i = 0; i < position_list.length; i++) {
                    total  += parseInt(position_list[i].Overall);
                }
                overall_avg = total / position_list.length;
            }
        else {overall_avg = 0}
        // console.log(overall_avg)
        overall_list.push(overall_avg)
        }
    )
    console.log (overall_list)
    var potential_spider = Object.values(spider_dict).filter(row => row.Potential);
    // console.log(potential_spider)
    var potential_total = 0
    for (var i = 0; i < potential_spider.length; i++) {
        potential_total  += parseInt(potential_spider[i].Potential);
      }
    potential_average = potential_total / potential_spider.length;
    // console.log(potential_average)
    overall_list.push(potential_average)
    // console.log(overall_list)
    data = [{
        type: 'scatterpolar',
        r: overall_list,
        theta: ["FWD","MID", "DEF", "GK", "Potential",],
        fill: 'toself'
      }]
      layout = {
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 100]
        }
        },
        showlegend: false,
      }
     Plotly.newPlot("spider-plot", data, layout)
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pieBuilder() {
    var budget = 400;
    var names =[];
    var amounts =[];
    var amountSum = 0;
    for (let [key, value] of Object.entries(spider_dict)) {
        names.push(value.Name);
        amounts.push(value.Value);
        amountSum = amountSum + parseInt(value.Value)
    }
    var remainder=budget-amountSum
    if (remainder>0) {
        names.push("Remaining")
        amounts.push(remainder)
        pie_trace = [{
            labels : names,
            values : amounts,
            type : "pie"
        }];
        var layout = {
            title: "Budget Analysis",
        };
        var plot = d3.select("#pie-plot");
        plot.html("")
        Plotly.newPlot("pie-plot", pie_trace, layout);
    }
    else {
        var plot = d3.select("#pie-plot");
        plot.html("")
        plot.text("You Have Exceeded your Budget. Tsk. Tsk.")
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// EVENTS
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

// DROPDOWN EVENTS
// When the user selects a new player from any of the dropdowns,
// we call getData() which will populate the information table
d3.selectAll("#selDatasetGK").on("change", getDataFunctions["#selDatasetGK"]);
d3.selectAll("#selDatasetDEF").on("change", getDataFunctions["#selDatasetDEF"]);
d3.selectAll("#selDatasetMID").on("change", getDataFunctions["#selDatasetMID"]);
d3.selectAll("#selDatasetFWD").on("change", getDataFunctions["#selDatasetFWD"]);

// BUTTON EVENTS
// Select the goalkeeper's add button and create the event handler for a click
d3.select("#add-GK").on("click", () => {addFunctions["GK"]();
                                          spiderBuilder();
                                          pieBuilder();
});

// Select the goalkeeper's delete button and create the event handler for a click
d3.select("#del-GK").on("click", () => {delFunctions["GK"]();
                                          spiderBuilder();
                                          pieBuilder();
});

// ETC.
d3.select("#add-DEF1").on("click", () => {addFunctions["DEF1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-DEF1").on("click",  () => {delFunctions["DEF1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-DEF2").on("click",  () => {addFunctions["DEF2"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-DEF2").on("click",  () => {delFunctions["DEF2"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-DEF3").on("click",  () => {addFunctions["DEF3"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-DEF3").on("click",  () => {delFunctions["DEF3"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-DEF4").on("click",  () => {addFunctions["DEF4"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-DEF4").on("click",  () => {delFunctions["DEF4"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-MID1").on("click",  () => {addFunctions["MID1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-MID1").on("click",  () => {delFunctions["MID1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-MID2").on("click",  () => {addFunctions["MID2"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-MID2").on("click",  () => {delFunctions["MID2"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-MID3").on("click",  () => {addFunctions["MID3"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-MID3").on("click",  () => {delFunctions["MID3"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-MID4").on("click",  () => {addFunctions["MID4"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-MID4").on("click",  () => {delFunctions["MID4"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-FWD1").on("click",  () => {addFunctions["FWD1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-FWD1").on("click",  () => {delFunctions["FWD1"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#add-FWD2").on("click",  () => {addFunctions["FWD2"]();
                                          spiderBuilder();
                                          pieBuilder();
});
d3.select("#del-FWD2").on("click",  () => {delFunctions["FWD2"]();
                                          spiderBuilder();
                                          pieBuilder();
});

// Run that bitch
fetch_all(init);