goalInputs = 3;
maxANDgates = 3;
maxORgates = 2;
maxXORgates = 2;
maxNOTgates = 2;
goalTable = [false, true, true, false, true, false, false, false];//exactly 2 inputs are true for out to be true
winMessage = "congratulations, you have solved one of the 256 challenges of the second lowest complexity";

document.getElementById("goalInputs").innerHTML = goalInputs;
document.getElementById("maxANDgates").innerHTML = maxANDgates;
document.getElementById("maxORgates").innerHTML = maxORgates;
document.getElementById("maxXORgates").innerHTML = maxXORgates;
document.getElementById("maxNOTgates").innerHTML = maxNOTgates;
