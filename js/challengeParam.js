function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var part1 = "0" + getParameterByName("i");
if (getParameterByName("i") > 9) part1 = getParameterByName("i");
var challengeID = "G" + part1 + getParameterByName("j");

// connect to the table with the Given challengeID in database

goalInputs = getParameterByName("in");
maxANDgates = getParameterByName("and");
maxORgates = getParameterByName("or");
maxXORgates = getParameterByName("xor");
maxNOTgates = getParameterByName("not");
goalTable = [false, true, true, false];//2 input XOR truth table out column
winMessage = "Congratulations, you have solved one of the 16 challenges of the lowest complexity";
var challengeHeader = document.createTextNode("2 input XOR challenge");
var challengeDescription = document.createTextNode("Construct a circuit that produces the same output as a XOR gate, shown on the leftmost column of the truth table.");

/*
what we really want:

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



var andLine = document.createElement("li");
andLine.innerHTML = maxANDgates + " AND gates";
var orLine = document.createElement("li");
orLine.innerHTML = maxORgates + " OR gates";
var xorLine = document.createElement("li");
xorLine.innerHTML = maxXORgates + " XOR gates";
var notLine = document.createElement("li");
notLine.innerHTML = maxNOTgates + " NOT gates";

if (maxANDgates && maxANDgates > 0) document.getElementById("restrictions").appendChild(andLine);
if (maxORgates && maxORgates > 0) document.getElementById("restrictions").appendChild(orLine);
if (maxXORgates && maxXORgates > 0) document.getElementById("restrictions").appendChild(xorLine);
if (maxNOTgates && maxNOTgates > 0) document.getElementById("restrictions").appendChild(notLine);
