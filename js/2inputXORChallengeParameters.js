
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

document.getElementById("goalInputs").innerHTML = goalInputs;
document.getElementById("maxANDgates").innerHTML = maxANDgates;
document.getElementById("maxORgates").innerHTML = maxORgates;
document.getElementById("maxXORgates").innerHTML = maxXORgates;
document.getElementById("maxNOTgates").innerHTML = maxNOTgates;
