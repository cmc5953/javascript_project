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
    Object.keys(filtered_data[0]).forEach(attribute => {
        if (attribute == "//Position") { // This is an option for taking out the second position column from the table
            // pass
        } else {
        list.append("li")
            .text(`${attribute}\t ${filtered_data[0][attribute]}`)
        }
    });
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

// ADD BUTTONS
function populateTableGK() {
    var pos = "GK"
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
}
function populateTableDEF1() {
    var pos = "DEF1"
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
}
function populateTableDEF2() {
    var pos = "DEF2"
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
}
function populateTableDEF3() {
    var pos = "DEF3"
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
}
function populateTableDEF4() {
    var pos = "DEF4"
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
}
function populateTableMID1() {
    var pos = "MID1"
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
}
function populateTableMID2() {
    var pos = "MID2"
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
}
function populateTableMID3() {
    var pos = "MID3"
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
}
function populateTableMID4() {
    var pos = "MID4"
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
}
function populateTableFWD1() {
    var pos = "FWD1"
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
}
function populateTableFWD2() {
    var pos = "FWD2"
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
}

// DELETE BUTTONS
function delDataGK() {
    var pos = "GK"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataDEF1() {
    var pos = "DEF1"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataDEF2() {
    var pos = "DEF2"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataDEF3() {
    var pos = "DEF3"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataDEF4() {
    var pos = "DEF4"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataMID1() {
    var pos = "MID1"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataMID2() {
    var pos = "MID2"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataMID3() {
    var pos = "MID3"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataMID4() {
    var pos = "MID4"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataFWD1() {
    var pos = "FWD1"
    var trow = d3.select(`#${pos}`);
    trow.html("");
    var initialcell = trow.append("td");
    initialcell.text(pos);
    delete spider_dict[pos];
}
function delDataFWD2() {
    var pos = "FWD2"
    var trow = d3.select(`#${pos}`);
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
button.on("click", delDataGK);

var button = d3.select("#add-DEF1");
button.on("click", populateTableDEF1);
var button = d3.select("#del-DEF1");
button.on("click", delDataDEF1);

var button = d3.select("#add-DEF2");
button.on("click", populateTableDEF2);
var button = d3.select("#del-DEF2");
button.on("click", delDataDEF2);

var button = d3.select("#add-DEF3");
button.on("click", populateTableDEF3);
var button = d3.select("#del-DEF3");
button.on("click", delDataDEF3);

var button = d3.select("#add-DEF4");
button.on("click", populateTableDEF4);
var button = d3.select("#del-DEF4");
button.on("click", delDataDEF4);

var button = d3.select("#add-MID1");
button.on("click", populateTableMID1);
var button = d3.select("#del-MID1");
button.on("click", delDataMID1);

var button = d3.select("#add-MID2");
button.on("click", populateTableMID2);
var button = d3.select("#del-MID2");
button.on("click", delDataMID2);

var button = d3.select("#add-MID3");
button.on("click", populateTableMID3);
var button = d3.select("#del-MID3");
button.on("click", delDataMID3);

var button = d3.select("#add-MID4");
button.on("click", populateTableMID4);
var button = d3.select("#del-MID4");
button.on("click", delDataMID4);

var button = d3.select("#add-FWD1");
button.on("click", populateTableFWD1);
var button = d3.select("#del-FWD1");
button.on("click", delDataFWD1);

var button = d3.select("#add-FWD2");
button.on("click", populateTableFWD2);
var button = d3.select("#del-FWD2");
button.on("click", delDataFWD2);

fetch_all(init);