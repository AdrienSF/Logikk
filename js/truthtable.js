//store the output and input text elements so we can change them later
var outStateText = [];
var inputStateText = [[],[]];
//store instances of input gates
var inputsInst = [];

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

    document.getElementById("TTbody").appendChild(stateRow);
  }

  updateTableStates();
  updateBoolExpr();
  updateGateColours();
}

function createInputLabels() {
  // Set input header title to corresponding letter
  for (j = 0; j <= inputsInst.length-1; j++)
    gateToHtml.get(inputsInst[j]).firstChild.innerHTML = String.fromCharCode(65 + j);
}


function updateTableStates() {
  var inputStatesOriginal = [];
  for(var i = 0; i < inputsInst.length; i++)
    inputStatesOriginal.push(inputsInst[i].getState());

  hasUpdatedOutSuccessfully = true;
  if(outInst && gateToHtml.get(outInst))
    outInst.getState();

  for(var bitmask = 0; bitmask < Math.pow(2, inputsInst.length); bitmask++) {
    var row = Math.pow(2, inputsInst.length) - bitmask - 1;

    for(var i = 0; i < inputsInst.length; i++) {
      if((1 << (inputsInst.length - i - 1) & bitmask) != 0)
        inputsInst[i].state = true;
      else
        inputsInst[i].state = false;

      inputStateText[row][i].nodeValue = inputsInst[i].getState() ? "T" : "F";
      inputStateText[row][i].parentNode.style.color = inputsInst[i].getState() ? "red" : "black";

      if(hasUpdatedOutSuccessfully) {
        outStateText[row].nodeValue = outInst.getState() ? "T" : "F";
        outStateText[row].parentNode.style.color = outInst.getState() ? "red" : "black";
      } else {
        outStateText[row].nodeValue = "n/a";
        outStateText[row].parentNode.style.color = "black";
      }
    }

    // color the row we are on in sandbox
    outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "white";

    for(var i = 0; i < inputsInst.length; i++) {
      var isOn = (1 << (inputsInst.length - i - 1) & bitmask) != 0;
      if(inputStatesOriginal[i] != isOn) break;
      else if(i < inputsInst.length - 1) continue;
      else {
        outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "#E9E9E9";
        break;
      }
    }
  }

  for(var i = 0; i < inputsInst.length; i++)
    inputsInst[i].state = inputStatesOriginal[i];
  if(outInst) outInst.getState(); // update all other gates

  if(typeof updateGoalTableStates == 'function')
    updateGoalTableStates();
}
