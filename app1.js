// 

// var dummy_data = [{
//     "Name" : "Messi",
//     "Position" : "FWD",
//     "Overall" : 94,
//     "Potential" : 0
// },{ 
//     "Name" : "Ronaldo",
//     "Position" : "FWD",
//     "Overall" : 95,
//     "Potential" : 0
// },{ 
//     "Name" : "Joe Shmo",
//     "Position" : "GK",
//     "Overall" : 7,
//     "Potential" : 3
// }];

let data_GK;
let data_DEF;
let data_MID;
let data_FWD;

function fetch_GK(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/GK').then(data=>{
        data.json().then(d => {
            data_GK = d.Result;
            callback();
        })
    })
}
function fetch_DEF(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/DEF').then(data=>{
        data.json().then(d => {
            data_DEF = d.Result;
            callback();
        })
    })
}
function fetch_MID(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/MID').then(data=>{
        data.json().then(d => {
            data_MID = d.Result;
            callback();
        })
    })
}
function fetch_FWD(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/FWD').then(data=>{
        data.json().then(d => {
            data_FWD = d.Result;
            callback();
        })
    })
}


// INIT FUNCTIONS //////////////////////////////////////////////////////////////////////
function init_GK() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetGK");
    
    data_GK.forEach(element => {
        dropdownMenu.append("option")
                    .attr("value", element.Name)
                    .text(element.Name);
    });
    getGK();
};
function init_DEF() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetDEF");
    
    data_DEF.forEach(element => {
        dropdownMenu.append("option")
                    .attr("value", element.Name)
                    .text(element.Name);
    });
    getDEF();
};
function init_MID() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetMID");
    
    data_MID.forEach(element => {
        dropdownMenu.append("option")
                    .attr("value", element.Name)
                    .text(element.Name);
    });
    getMID();
};
function init_FWD() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetFWD");
    
    data_FWD.forEach(element => {
        dropdownMenu.append("option")
                    .attr("value", element.Name)
                    .text(element.Name);
    });
    getFWD();
};

// On change, call getData()
d3.selectAll("#selDatasetGK").on("change", getGK);
d3.selectAll("#selDatasetDEF").on("change", getDEF);
d3.selectAll("#selDatasetMID").on("change", getMID);
d3.selectAll("#selDatasetFWD").on("change", getFWD);


// GETDATA FUNCTION //////////////////////////////////////////////////////////////////
function getGK() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetGK");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    
    var filtered_data = data_GK.filter(player => player.Name === subject_selection);

    console.log(filtered_data);
  
    // Finally, select the unordered list element
    var list = d3.select("ul"); 

    // remove any info from the list
    list.html("");

    // append info to the unordered list
    filtered_data.forEach(attribute => 
        list.append("li")
            .text(`${attribute.Name}, Skill ${attribute.Overall}`)
    )
    return filtered_data;
}
function getDEF() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetDEF");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    
    var filtered_data = data_DEF.filter(player => player.Name === subject_selection);

    console.log(filtered_data);
  
    // Finally, select the unordered list element
    var list = d3.select("ul"); 

    // remove any info from the list
    list.html("");

    // append info to the unordered list
    filtered_data.forEach(attribute => 
        list.append("li")
            .text(`${attribute.Name}, Skill ${attribute.Overall}`)
    )
    return filtered_data;
}
function getMID() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetMID");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    
    var filtered_data = data_MID.filter(player => player.Name === subject_selection);

    console.log(filtered_data);
  
    // Finally, select the unordered list element
    var list = d3.select("ul"); 

    // remove any info from the list
    list.html("");

    // append info to the unordered list
    filtered_data.forEach(attribute => 
        list.append("li")
            .text(`${attribute.Name}, Skill ${attribute.Overall}`)
    )
    return filtered_data;
}
function getFWD() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetFWD");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    
    var filtered_data = data_FWD.filter(player => player.Name === subject_selection);

    console.log(filtered_data);
  
    // Finally, select the unordered list element
    var list = d3.select("ul"); 

    // remove any info from the list
    list.html("");

    // append info to the unordered list
    filtered_data.forEach(attribute => 
        list.append("li")
            .text(`${attribute.Name}, Skill ${attribute.Overall}`)
    )
    return filtered_data;
}
////////////////////////////////////////////////////////////////////////////

function populateTable() {

    var tbody = d3.select("tbody");
    
    // clear the existing data
    // tbody.html("");
    
    getMID().forEach(function(player) {
    
        // Step 1:  Use d3 to append one table row `tr` for each weather report object (no data yet)
        var row = tbody.append("tr");
        
        // Step 2:  Use `Object.entries` to console.log each weather report value
        Object.entries(player).forEach(function([key, value]) {
        //   console.log(key, value);
        
        // Step 3: Use d3 to append 1 cell per weather report value (weekday, date, high, low)
        var cell = row.append("td");
        
        // Step 4: Use d3 to update each cell's text with weather report values (weekday, date, high, low)
        cell.text(value);
        });
    });
}

function delData() {
    var tbody = d3.select("tbody");

    tbody.html("");

}
// EVENTS: Select what actions will register as an event
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

// Select the button and create the event handler for a click
var button = d3.select("#add-GK");
button.on("click", populateTable);

var button = d3.select("#del-GK");
button.on("click", delData);



fetch_GK(init_GK);
fetch_DEF(init_DEF);
fetch_MID(init_MID);
fetch_FWD(init_FWD);

// setTimeout(init, 500);
// setTimeout(getData, 1000);