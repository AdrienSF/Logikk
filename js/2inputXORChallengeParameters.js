goalInputs = 2;
maxANDgates = 2;
maxORgates = 2;
maxXORgates = 0;
maxNOTgates = 2;
goalTable = [false, true, true, false];//2 input XOR truth table out column
winMessage = "congratulations, you have solved one of the 16 challenges of the lowest complexity";

document.getElementById("goalInputs").innerHTML = goalInputs;
document.getElementById("maxANDgates").innerHTML = maxANDgates;
document.getElementById("maxORgates").innerHTML = maxORgates;
document.getElementById("maxXORgates").innerHTML = maxXORgates;
document.getElementById("maxNOTgates").innerHTML = maxNOTgates;
