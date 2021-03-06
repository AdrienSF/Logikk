// parameters defined in challengeInfo.php

var goalOutStateText = [];

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
    document.getElementById("inputButton").disabled = (inputsInst.length >= challengeData.in);
    document.getElementById("andButton").disabled = (andInst.length >= challengeData.and);
    document.getElementById("orButton").disabled = (orInst.length >= challengeData.or);
    document.getElementById("xorButton").disabled = (xorInst.length >= challengeData.xor);
    document.getElementById("notButton").disabled = (notInst.length >= challengeData.not);

    //display amount of gates left upon hover
    if(challengeData.in - inputsInst.length > 0)
    document.getElementById("inputButton").title = challengeData.in - inputsInst.length + " left";
    else document.getElementById("inputButton").title = "none left";

    if (challengeData.and - andInst.length > 0)
    document.getElementById("andButton").title = challengeData.and - andInst.length + " left";
    else document.getElementById("andButton").title = "none left";

    if (challengeData.or - orInst.length > 0)
    document.getElementById("orButton").title = challengeData.or - orInst.length + " left";
    else document.getElementById("orButton").title = "none left";

    if (challengeData.xor - xorInst.length)
    document.getElementById("xorButton").title = challengeData.xor - xorInst.length + " left";
    else document.getElementById("xorButton").title = "none left";

    if (challengeData.not - notInst.length > 0)
    document.getElementById("notButton").title = challengeData.not - notInst.length + " left";
    else document.getElementById("notButton").title = "none left";

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

  if(inputsInst.length != challengeData.in) {
    var inputMessage = document.createElement("div");
    var amount = challengeData.in - inputsInst.length;
    inputMessage.className = "text-center";
    inputMessage.appendChild(document.createTextNode("add " + amount + " more inputs"))
    document.getElementById("TTbody").appendChild(inputMessage);

    return;
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
    outStateText.push(document.createTextNode("n/a"));
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
  for(var row = 0; row < Math.pow(2, inputsInst.length); row++) {
    goalOutStateText[row].nodeValue = challengeData.truth_table[row];
    goalOutStateText[row].parentNode.style.color = challengeData.truth_table[row] == "T" ? "red" : "black";
  }

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

  document.getElementById("submitButton").disabled = !correct || ((""+inputsInst.length) != challengeData.in);
  if (document.getElementById("submitButton").disabled == true) document.getElementById("submitButton").title = "challenge is incomplete";
  else document.getElementById("submitButton").title = "evaluate challenge correctness";

  if (correct && ((""+inputsInst.length) === (""+challengeData.in)) && isSubmitted) {
    $("#myModal").modal();
  }
}

// to create out gate
clearAll(true);
document.getElementById("submitButton").disabled = true;
