var soccerdata;
function fetch_all(callback) {
    fetch('https://fifa-ratings-api.herokuapp.com/').then(data=>{
    data.json().then(d => {
        soccerdata = d.Result;
        callback();
    })
});
}


// INIT FUNCTION //////////////////////////////////////////////////////////////////////
function init() {
    // GK dropdown
    var dropdownMenu = d3.select("#selDatasetGK");
    var GKdata=soccerdata.filter(player => player.Position === "GK");
    GKdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // DEF dropdown
    var dropdownMenu = d3.select("#selDatasetDEF");
    var DEFdata=soccerdata.filter(player => player.Position === "DEF");
    DEFdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // MID dropdown
    var dropdownMenu = d3.select("#selDatasetMID");
    var MIDdata=soccerdata.filter(player => player.Position === "MID");
    MIDdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
    // FWD dropdown
    var dropdownMenu = d3.select("#selDatasetFWD");
    var FWDdata=soccerdata.filter(player => player.Position === "FWD");
    FWDdata.forEach(element => {
        dropdownMenu.append("option").attr("value", element.Name).text(element.Name);
    });
};

// On change, call getData()
d3.selectAll("#selDatasetGK").on("change", getDataGK);
d3.selectAll("#selDatasetDEF").on("change", getDataDEF);
d3.selectAll("#selDatasetMID").on("change", getDataMID);
d3.selectAll("#selDatasetFWD").on("change", getDataFWD);

// GETDATA FUNCTION //////////////////////////////////////////////////////////////////
function getDataGK() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetGK");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    var filtered_data = soccerdata.filter(player => player.Name === subject_selection);
    // Finally, select the unordered list element
    var list = d3.select("ul"); 
    // remove any info from the list
    list.html("");
    // append info to the unordered list
    Object.keys(filtered_data[0]).forEach(attribute => 
        list.append("li")
            .text(`${attribute}\t ${filtered_data[0][attribute]}`)
    )
    return filtered_data;
}
function getDataDEF() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetDEF");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    var filtered_data = soccerdata.filter(player => player.Name === subject_selection);
    // Finally, select the unordered list element
    var list = d3.select("ul"); 
    // remove any info from the list
    list.html("");
    // append info to the unordered list
    Object.keys(filtered_data[0]).forEach(attribute => 
        list.append("li")
            .text(`${attribute}\t ${filtered_data[0][attribute]}`)
    )
    return filtered_data;
}
function getDataMID() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetMID");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    var filtered_data = soccerdata.filter(player => player.Name === subject_selection);
    // Finally, select the unordered list element
    var list = d3.select("ul"); 
    // remove any info from the list
    list.html("");
    // append info to the unordered list
    Object.keys(filtered_data[0]).forEach(attribute => 
        list.append("li")
            .text(`${attribute}\t ${filtered_data[0][attribute]}`)
    )
    return filtered_data;
}
function getDataFWD() {
    // Select the dropdown menu
    var dropdownMenu = d3.select("#selDatasetFWD");
    // Assign the value of the dropdown menu option to a variable
    var subject_selection = dropdownMenu.property("value");
    // Use D3.json() to fetch and read the JSON file
    var filtered_data = soccerdata.filter(player => player.Name === subject_selection);
    // Finally, select the unordered list element
    var list = d3.select("ul"); 
    // remove any info from the list
    list.html("");
    // append info to the unordered list
    Object.keys(filtered_data[0]).forEach(attribute => 
        list.append("li")
            .text(`${attribute}\t ${filtered_data[0][attribute]}`)
    )
    return filtered_data;
}

////////////////////////////////////////////////////////////////////////////
var spider_dict = {};

function populateTableGK() { // CHANGE
    var pos = "GK" // CHANGE
    var trow = d3.select(`#${pos}`);
    spider_dict[pos] = {};

    // clear the existing data
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
}

function delDataGK() { // CHANGE
    var pos = "GK" // CHANGE
    var trow = d3.select(`#${pos}`);
    
    // clear the existing data
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];

}
// EVENTS: Select what actions will register as an event
//▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

// Select the button and create the event handler for a click
var button = d3.select("#add-GK");
button.on("click", populateTableGK);

var button = d3.select("#del-GK");
button.on("click", delDataGK); // REPEAT

fetch_all(init);