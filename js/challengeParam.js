
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


goalInputs = getParameterByName("in");
maxANDgates = getParameterByName("and");
maxORgates = getParameterByName("or");
maxXORgates = getParameterByName("xor");
maxNOTgates = getParameterByName("not");
goalTable = [false, true, true, false];//2 input XOR truth table out column
winMessage = "congratulations, you have solved one of the 16 challenges of the lowest complexity";
var challengeHeader = document.createTextNode("2 input XOR challenge");
var challengeDescription = document.createTextNode("Construct a circuit that produces the same output as a XOR gate, shown on the leftmost column of the truth table.");

/*
what we really want:

var challengeToLoad = getParameterByName("challenge");

connect to table challengeToLoad in database (sudocode because I don't know how to do this)

goalInputs = some data fetched from database;
maxANDgates = some data fetched from database;
maxORgates = some data fetched from database;
maxXORgates = some data fetched from database;
maxNOTgates = some data fetched from database;
goalTable = some data fetched from database;
winMessage = some data fetched from database;
var challengeHeader = document.createTextNode(some data fetched from database);
var challengeDescription = document.createTextNode(some data fetched from database);

*/


document.getElementById("challengeHeader").appendChild(challengeHeader);
document.getElementById("challengeDescription").appendChild(challengeDescription);
document.getElementById("goalInputs").innerHTML = goalInputs;
document.getElementById("maxANDgates").innerHTML = maxANDgates;
document.getElementById("maxORgates").innerHTML = maxORgates;
document.getElementById("maxXORgates").innerHTML = maxXORgates;
document.getElementById("maxNOTgates").innerHTML = maxNOTgates;
