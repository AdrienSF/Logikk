var goalInputs;
var maxANDgates;
var maxORgates;
var maxXORgates;
var maxNOTgates;

var goalOutStateText = [];
var goalTable;//XOR gate truth table for 2 inputs
var winMessage;

function updateButtonDisabling() {
  //reset counting arrays
  var inputsInst = [];
  var andInst = [];
  var orInst = [];
  var xorInst = [];
  var notInst = [];
  //count each gate type
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
    if(gates[i].type == AND)
      andInst.push(gates[i]);
    if(gates[i].type == OR)
      orInst.push(gates[i]);
    if(gates[i].type == XOR)
      xorInst.push(gates[i]);
    if(gates[i].type == NOT)
      notInst.push(gates[i]);

    //disable button if max gates are spawned
    document.getElementById("inputButton").disabled = (inputsInst.length >= goalInputs);
    document.getElementById("andButton").disabled = (andInst.length >= maxANDgates);
    document.getElementById("orButton").disabled = (orInst.length >= maxORgates);
    document.getElementById("xorButton").disabled = (xorInst.length >= maxXORgates);
    document.getElementById("notButton").disabled = (notInst.length >= maxNOTgates);

  }
}

function createTruthTable() {
  //reset text arrays
  outStateText.length = 0;
  inputStateText.length = 0;
  inputsInst.length = 0;
  //erase existing truth table
  while (document.getElementById("TThead").firstChild) {
    document.getElementById("TThead").removeChild(document.getElementById("TThead").firstChild);
  }
  while (document.getElementById("TTbody").firstChild) {
    document.getElementById("TTbody").removeChild(document.getElementById("TTbody").firstChild);
  }
  //count IN gates
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
  }
  //display inputs in table
  for (j = 0; j <= inputsInst.length-1; j++) {
    var inputCell = document.createElement("td");
    var inputText = document.createTextNode(String.fromCharCode(65 + j));

    inputCell.appendChild(inputText);
    document.getElementById("TThead").appendChild(inputCell);
  }
  //display out in table header
  var outCell = document.createElement("td");
  var boldElement = document.createElement("b");
  var outText = document.createTextNode("OUT");
  boldElement.appendChild(outText);
  outCell.appendChild(boldElement);
  document.getElementById("TThead").appendChild(outCell);
  //display goal out in header
  var goalOutCell = document.createElement("td");
  var goalBoldElement = document.createElement("b");
  var goalOutText = document.createTextNode("GOAL");
  goalBoldElement.appendChild(goalOutText);
  goalOutCell.appendChild(goalBoldElement);
  document.getElementById("TThead").appendChild(goalOutCell);

  //display table body
  for (i = 0; i <= Math.pow(2, inputsInst.length)-1; i++) {
    var stateRow = document.createElement("tr");
    inputStateText.push([]);
    for (j = 0; j <= inputsInst.length-1; j++) {
      var stateCell = document.createElement("td");
      inputStateText[i].push(document.createTextNode("null"));
      stateCell.appendChild(inputStateText[i][j]);
      stateRow.appendChild(stateCell);
    }//display output column
    var outStateCell = document.createElement("td");
    outStateText.push(document.createTextNode("F"));
    var boldElement = document.createElement("b");
    boldElement.appendChild(outStateText[i]);
    outStateCell.appendChild(boldElement);
    stateRow.appendChild(outStateCell);
    //display goal output column
    var goalOutStateCell = document.createElement("td");
    goalOutStateText.push(document.createTextNode("F"));
    var goalBoldElement = document.createElement("b");
    goalBoldElement.appendChild(goalOutStateText[i]);
    goalOutStateCell.appendChild(goalBoldElement);
    stateRow.appendChild(goalOutStateCell);

    document.getElementById("TTbody").appendChild(stateRow);
  }

  updateTableStates();
  updateBoolExpr();
}

function updateGoalTableStates() {
  for(var row = 0; row < Math.pow(2, inputsInst.length); row++)
    goalOutStateText[row].nodeValue = goalTable[row] ? "T" : "F";
  checkChallengeComplete();
}

function checkChallengeComplete(isSubmitted) {
  var correct = true;
  //reset all to black
  for (i = 0; i < Math.pow(2, inputsInst.length); i++)
    goalOutStateText[i].parentElement.parentElement.parentElement.style.backgroundColor = "white";

  //check and color the incorrect rows
  for (row = 0; row < Math.pow(2, inputsInst.length); row++)
  {
    var rowCorrect = goalOutStateText[row].nodeValue === outStateText[row].nodeValue;
    if (!rowCorrect) {
      correct = false;
      goalOutStateText[row].parentElement.parentElement.parentElement.style.backgroundColor = "pink";
    }

    for(var i = 0; i < inputsInst.length; i++) {
      var isOn = (1 << (inputsInst.length - i - 1) & row) != 0;
      if(inputsInst[i].getState() === isOn) break;
      else if(i < inputsInst.length - 1) continue;
      else {
        if(rowCorrect) outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "#E9E9E9";
        else outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "palevioletred";
        break;
      }
    }
  }

  document.getElementById("submitButton").disabled = !correct || ((""+inputsInst.length) != goalInputs);

  if (correct && ((""+inputsInst.length) === (""+goalInputs)) && isSubmitted) {
    alert(winMessage);
  }
}

// to create out gate
clearAll(true);
