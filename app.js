// 

var dummy_data = [{
    "Name" : "Messi",
    "Position" : "FWD",
    "Overall" : 94,
    "Potential" : 0
},{ 
    "Name" : "Ronaldo",
    "Position" : "FWD",
    "Overall" : 95,
    "Potential" : 0
},{ 
    "Name" : "Joe Shmo",
    "Position" : "GK",
    "Overall" : 7,
    "Potential" : 3
}];


// fetch('https://fifa-ratings-api.herokuapp.com/GK').then(data=>{
//     data.json().then(d => console.log(d.Result, 2))
// });
// fetch('https://fifa-ratings-api.herokuapp.com/DEF').then(data=>{
//     data.json().then(d => console.log(d.Result, 2))
// });
// fetch('https://fifa-ratings-api.herokuapp.com/MID').then(data=>{
//      console.log(data, 3)
// });
// fetch('https://fifa-ratings-api.herokuapp.com/FWD').then(data=>{
//      console.log(data, 4)
// });



// INIT FUNCTION //////////////////////////////////////////////////////////////////////
function init(callback) {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    
    dummy_data.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
        // console.log(element.Name);
    });
    callback();
    // });
    console.log(dummy_data);
};

// On change, call getData()
d3.selectAll("#selDataset").on("change", getData);

// GETDATA FUNCTION //////////////////////////////////////////////////////////////////
function getData() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    
    var filtered_data = dummy_data.filter(player => player.Name === subject_selection);

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
    tbody.html("");
    
    getData().forEach(function(player) {
    
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

init(getData);