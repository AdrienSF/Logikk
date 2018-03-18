let IN     = "IN";
let OUT    = "OUT";
let AND    = "AND";
let OR     = "OR";
let XOR    = "XOR";
let NOT    = "NOT";

class Gate {
  // type may be IN, AND, OR, XOR, NOT
  constructor(type) {
    this.type = type;

    this.inputs = [];
    this.outputs = [];

    if(this.type == IN)
      this.state = false;
  }

  getStatePrecalculated() {
    // use this after running getState if nothing has changed
    // saves computing power and time
    return this.state;
  }

  getState() {
    var type = this.type;
    var inputs = this.inputs;
    var outputs = this.outputs;

    if(type == IN) {
      return this.state;
    }

    if(inputs.length == 0) {
      if(type == NOT)
        this.state = true;
      else
        this.state = false;

      hasUpdatedOutSuccessfully = false;
      this.state = false;
      return this.state;
    }

    if(type == OUT) {
      return inputs[0].getState();
    }

    if(type == AND) {
      this.state = false;
      for(var i = 0; i < inputs.length; i++)
        if(!inputs[i].getState()) return false;
      this.state = true;
      return true;
    }

    if(type == OR) {
      this.state = true;
      for(var i = 0; i < inputs.length; i++)
        if(inputs[i].getState()) return true;
      this.state = false;
      return false;
    }

    if(type == XOR) {
      var count = 0;
      for(var i = 0; i < inputs.length; i++)
        if(inputs[i].getState()) count++;
      this.state = count == 1;
      return count == 1;
    }

    if(type == NOT) {
      this.state = !inputs[0].getState();
      return !inputs[0].getState();
    }
  }
}

var hasUpdatedOutSuccessfully = false;

// HTML node <-> Gate instance map
let htmlToGate = new Map();
let gateToHtml = new Map();
let gates = [];
// outInst is the output gate instance
let outInst = null;

// this maps a html gate node to the output image (so we can change on/off)
let outImage = new Map();

// When dragging out a connection, this represents that line
// negative values mean it doesn't exist
var dragLineX1 = -10, dragLineX2 = -10, dragLineY1 = -10, dragLineY2 = -10;

// create a new gate
function makeGate(type) {
  // create a new div element
  var gateNode = document.createElement("div");
  gateNode.id = "gate";

  // position the node
  gateNode.style.top = (gateNode.offsetTop + 250) + "px";
  gateNode.style.left = (gateNode.offsetLeft + 50) + "px";

  // create a new gate instance
  var gateInst = new Gate(type);
  gates.push(gateInst);
  if(type == OUT)
    outInst = gateInst;

  htmlToGate.set(gateNode, gateInst);
  gateToHtml.set(gateInst, gateNode);

  // gateHeader needs to be firstChild for input title labelling later on in this script
  var gateHeaderNode = document.createElement("div");
  gateHeaderNode.innerHTML = type;
  gateHeaderNode.id = "gateheader";
  gateNode.appendChild(gateHeaderNode);

  if(type != IN) {
    var inputsNode = document.createElement("div");
    inputsNode.className = "column";
    inputsNode.innerHTML = "<img id=\"nodein\" src=\"../images/nodeoff.png\" draggable=\"false\" ondrop=\"dropped(event)\" ondragover=\"allowDrop(event)\" width=\"16\" height=\"16\">";
    gateNode.appendChild(inputsNode);
  } else {
    var toggleNode = document.createElement("div");
    toggleNode.className = "column";

    var toggleButton = document.createElement("input");
    toggleButton.type = "button";
    toggleButton.value = "F";
    toggleButton.width = 16;
    toggleButton.height = 16;

    toggleButton.addEventListener("click", function() {
      if(toggleButton.value == "F") {
        toggleButton.value = "T";
        gateInst.state = true;
      } else {
        toggleButton.value = "F";
        gateInst.state = false;
      }

      update();
    });

    toggleNode.appendChild(toggleButton);
    gateNode.appendChild(toggleNode);

    // createTruthTable();
    createInputLabels();
  }

  if(type != OUT) {
    var outputNode = document.createElement("div");
    outputNode.className = "column";
    outputNode.innerHTML = "<img id=\"nodeout\" src=\"../images/nodeoff.png\" draggable=\"true\" width=\"16\" height=\"16\">";
    gateNode.appendChild(outputNode);
    outImage.set(gateNode, outputNode.firstChild);
  }

  var canvas = document.getElementById("canvas");
  canvas.appendChild(gateNode);

  setupGate(gateNode, gateHeaderNode);

  // need this update to update output node, for example for not, it's on by default
  update();
}

function update() {
  // this updates their state instance variable so we can use precalculated state
  // that way we dont do unecessary calculations
  for(var i = 0; i < gates.length; i++)
    gates[i].getState();

  // updateInputButton();
  updateOutImage();
  drawLines();
  updateTableStates();
}

function checkChallengeComplete() {
  var correct = true;
  //reset all to black
  for (i = 0; i < Math.pow(2, goalInputs); i++)
  {
    for (j = 0; j < goalInputs; j++) {
      inputStateText[i][j].parentElement.style.color = "black";
    }
    var correct = goalOutStateText[i].nodeValue === outStateText[i].nodeValue;
      goalOutStateText[i].parentElement.style.color = "black";
      outStateText[i].parentElement.style.color = "black";
  }
  //check and color the incorct rows
  for (i = 0; i < Math.pow(2, goalInputs); i++)
  {
    var rowCorrect = goalOutStateText[i].nodeValue === outStateText[i].nodeValue;
    if (!rowCorrect) {
      correct = false;
      goalOutStateText[i].parentElement.style.color = "#ff0000";
      outStateText[i].parentElement.style.color = "#ff0000";
      for (j = 0; j < goalInputs; j++) {
        inputStateText[i][j].parentElement.style.color = "#ff0000";
      }
    }
  }

  if (correct) {
    stopwatch.stop();
    alert("congratulations, you have solved one of the 16 challenges of the lowest complexity");
  }
}


function updateInputButton() {
  var inputsInst = [];
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
    // if (goalInputs >= 8)
    // document.getElementById("inputButton").disabled = true;
    // else
    // document.getElementById("inputButton").disabled = false;
  }
}

function disconnectGates(sourceInst, targetInst) {
  // source outputs into target
  targetInst.inputs.splice(targetInst.inputs.indexOf(sourceInst), 1);
  sourceInst.outputs.splice(sourceInst.outputs.indexOf(targetInst), 1);
}

function clearAll() {
  htmlToGate.clear();
  gateToHtml.clear();
  outImage.clear();
  gates = [];

  var cnv = document.getElementById("canvas");
  while(cnv.firstChild)
    cnv.removeChild(cnv.firstChild);

  // createTruthTable();
  update();
  makeGate(OUT);
  for (i = 0; i < goalInputs; i++) makeGate(IN);

}

function updateOutImage() {
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == OUT) continue; // this one has none

    var imageNode = outImage.get(gateToHtml.get(gates[i]));
    if(gates[i].getStatePrecalculated())
      imageNode.src = "../images/nodeon.png";
    else
      imageNode.src = "../images/nodeoff.png";
  }
}

function drawLines() {
  function getPos(e) {
    // returns pos on screen
    var rect = e.getBoundingClientRect();
    return {x: rect.left, y: rect.top};
  }

  var svgcanvas = document.getElementById("svgcanvas");

  // clear canvas children, except defs for arrowhead
  while (svgcanvas.lastChild && svgcanvas.childNodes.length > 2)
    svgcanvas.removeChild(svgcanvas.lastChild);

  for(var i = 0; i < gates.length; i++) {
    for(var j = 0; j < gates[i].outputs.length; j++) {
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      let sourceInst = gates[i];
      let targetInst = gates[i].outputs[j];

      var sourceNode = gateToHtml.get(gates[i]);
      var targetNode = gateToHtml.get(gates[i].outputs[j]);

      var lineStartPos = getPos(sourceNode.querySelector("#nodeout"));
      var lineEndPos = getPos(targetNode.querySelector("#nodein"));
      var svgpos = getPos(svgcanvas);

      line.setAttribute('x1', lineStartPos.x - svgpos.x + 8);
      line.setAttribute('y1', lineStartPos.y - svgpos.y + 8);
      line.setAttribute('x2', lineEndPos.x - svgpos.x + 8);
      line.setAttribute('y2', lineEndPos.y - svgpos.y + 8);
      line.setAttribute('stroke-width', '4');

      var state = sourceInst.getState();
      if(state) {
        line.setAttribute('stroke', 'red');
        line.setAttribute('marker-end', 'url(#arrowred)');
      } else {
        line.setAttribute('stroke', 'black');
        line.setAttribute('marker-end', 'url(#arrowblack)');
      }

      // Disconnecting connection stuff
      line.onclick = function(e) {
        disconnectGates(sourceInst, targetInst);
        update();
      };

      svgcanvas.appendChild(line);
    }
  }

  // dragLine
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute('x1', dragLineX1);
  line.setAttribute('y1', dragLineY1);
  line.setAttribute('x2', dragLineX2);
  line.setAttribute('y2', dragLineY2);
  line.setAttribute('stroke-width', '4');

  line.setAttribute('stroke', 'black');
  svgcanvas.appendChild(line);
}

function allowDrop(e) {
  // prevent default handling of drop
  e.preventDefault();
}

function hasCycles(g, visited=null) {
  if(!visited) visited = new Set();

  if(visited.has(g) && g.type != IN)
    return true;

  visited.add(g);
  for(var i = 0; i < g.inputs.length; i++) {
    if(hasCycles(g.inputs[i], visited))
      return true;
    visited.delete(g.inputs[i]);
  }

  return false;
}

function dropped(e) {
  e.preventDefault();
  var sourceNode = e.dataTransfer.mozSourceNode.parentNode.parentNode;
  var targetNode = e.target.parentNode.parentNode;

  if(sourceNode === targetNode) {
    console.log("Can't connect gate to itself");
    return;
  }

  // sourceInst outputs into targetInst
  var sourceInst = htmlToGate.get(sourceNode);
  var targetInst = htmlToGate.get(targetNode);

  if(sourceInst.outputs.includes(targetInst)) {
    console.log("This connection already exists");
    return;
  }

  // if gate can only have one input, disconnect first
  if((targetInst.type == NOT || targetInst.type == OUT) && targetInst.inputs.length > 0)
    disconnectGates(targetInst.inputs[0], targetInst);

  sourceInst.outputs.push(targetInst);
  targetInst.inputs.push(sourceInst);

  if(hasCycles(targetInst)) {
    disconnectGates(sourceInst, targetInst);
    alert("You are trying to create a cycle!");
    return;
  }

  if(outInst.inputs > 0) {
    // createTruthTable();
    createInputLabels();
  }

  update();
}

function startChallenge() {
  fillGoalOutColumn();
  createTruthTable();
  document.getElementById("startChallengeButton").disabled = true;
}

function updateInputsInst() {
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
  }
}


//store the output and input text elements so we can change them later
var outStateText = [];
var inputStateText = [[],[]];
//store the output and input text elements so we can change them later
var goalOutStateText = [];
var goalInputs = 2;
//store instances of input gates
var inputsInst = [];

function fillGoalOutColumn() {
  for(var j = 0; j < Math.pow(2, goalInputs); j++) {
    goalOutStateText.push(document.createTextNode(Math.random() < 0.5));
  }
}


function createTruthTable() {
  //reset text arrays
  outStateText.length = 0;
  inputStateText.length = 0;
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

  updateInputsInst();
  //display inputs in table
  for (j = 0; j <= goalInputs-1; j++) {
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
  //dsplay goal out in header
  var goalCell = document.createElement("td");
  var boldElement = document.createElement("b");
  var goalText = document.createTextNode("GOAL");
  boldElement.appendChild(goalText);
  goalCell.appendChild(boldElement);
  document.getElementById("TThead").appendChild(goalCell);


  //display table body
  for (i = 0; i <= Math.pow(2, goalInputs)-1; i++) {
    var stateRow = document.createElement("tr");
    inputStateText.push([]);
    for (j = 0; j <= goalInputs-1; j++) {
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
    var boldElement = document.createElement("b");
    boldElement.appendChild(goalOutStateText[i]);
    goalOutStateCell.appendChild(boldElement);
    stateRow.appendChild(goalOutStateCell);


    document.getElementById("TTbody").appendChild(stateRow);
  }

  updateTableStates();
}

function createInputLabels() {
  // Set input header title to corresponding letter
  for (j = 0; j <= goalInputs-1; j++)
      gateToHtml.get(inputsInst[j]).firstChild.innerHTML = String.fromCharCode(65 + j);
}

function updateTableStates() {
  var inputStatesOriginal = [];
  for(var i = 0; i < goalInputs; i++)
    inputStatesOriginal.push(inputsInst[i].getState());

  // update out color
  if(outInst && gateToHtml.get(outInst)) {
    hasUpdatedOutSuccessfully = true;
    // try to update, this will set to false if there's a problem
    outInst.getState();
    if(!hasUpdatedOutSuccessfully)
      gateToHtml.get(outInst).firstChild.style.backgroundColor = "#AA1111";
    else
      gateToHtml.get(outInst).firstChild.style.backgroundColor = "#2196F3";
  }

  for(var bitmask = 0; bitmask < Math.pow(2, goalInputs); bitmask++) {
    var row = Math.pow(2, goalInputs) - bitmask - 1;

    for(var i = 0; i < goalInputs; i++) {
      if((1 << (goalInputs - i - 1) & bitmask) != 0)
        inputsInst[i].state = true;
      else
        inputsInst[i].state = false;
      inputStateText[row][i].nodeValue = inputsInst[i].getState() ? "T" : "F";
      outStateText[row].nodeValue = outInst.getState() ? "T" : "F";
    }

    // color the row we are on in sandbox
    outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "white";

    for(var i = 0; i < goalInputs; i++) {
      var isOn = (1 << (goalInputs - i - 1) & bitmask) != 0;
      if(inputStatesOriginal[i] != isOn) break;
      else if(i < goalInputs - 1) continue;
      else {
        outStateText[row].parentNode.parentNode.parentNode.style.backgroundColor = "#E9E9E9";
        break;
      }
    }
  }

  for(var i = 0; i < goalInputs; i++)
    inputsInst[i].state = inputStatesOriginal[i];
  if(outInst) outInst.getState(); // update all other gates
}

function fixPos(gateNode) {
  /*
  var pos1 = 0, pos2 = 0;
  if((gateNode.offsetLeft - pos1) < 0)
    gateNode.style.left = "0px";
  if((gateNode.offsetTop - pos2) < 0)
    gateNode.style.top = "0px";
  if((gateNode.offsetLeft - pos1) > canvasCard.offsetWidth - gateNode.offsetWidth)
    gateNode.style.left = canvasCard.offsetWidth - gateNode.offsetWidth + "px";
  if((gateNode.offsetTop - pos2) > canvasCard.offsetHeight - gateNode.offsetHeight)
    gateNode.style.top = canvasCard.offsetHeight - gateNode.offsetHeight + "px"; */
}

// Create an element draggable, removable
function setupGate(gateNode, headerNode) {
  headerNode.onmousedown = dragMouseDown;
  if(htmlToGate.get(gateNode).type != OUT)
    headerNode.addEventListener('contextmenu', removeGate);

  function removeGate(e) {
    e.preventDefault();

    var gateInst = htmlToGate.get(gateNode);

    // remove all connections to other gates
    for(var i = 0; i < gateInst.outputs.length; i++)
      gateInst.outputs[i].inputs.splice(gateInst.outputs[i].inputs.indexOf(gateInst), 1);

    for(var i = 0; i < gateInst.inputs.length; i++)
      gateInst.inputs[i].outputs.splice(gateInst.inputs[i].outputs.indexOf(gateInst), 1);

    // remove this from gates array
    for(var i = 0; i < gates.length; i++) {
      if(gates[i] == gateInst) {
        gates.splice(i, 1);
        break;
      }
    }

    gateToHtml.delete(gateInst);
    htmlToGate.delete(gateNode);

    outImage.delete(gateNode);

    gateNode.parentNode.removeChild(gateNode);

    // updateInputButton();
    // createTruthTable();
    createInputLabels();
    update();
  }

  var dx = 0, dy = 0, newX = 0, newY = 0;
  function dragMouseDown(e) {
    e.preventDefault();
    e = e || window.event;
    // get the mouse cursor position at startup:
    newX = e.clientX;
    newY = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    // put this as last node -> on top of others
    var parent = gateNode.parentNode;
    parent.removeChild(gateNode);
    parent.appendChild(gateNode);
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    dx = newX - e.clientX;
    dy = newY - e.clientY;
    newX = e.clientX;
    newY = e.clientY;

    if(gateNode.offsetLeft - dx < 0) {
      dx = 0;
      gateNode.style.left = "0px";
    }

    if(gateNode.offsetLeft - dx > canvasCard.offsetWidth - gateNode.offsetWidth) {
      dx = 0;
      gateNode.style.left = canvasCard.offsetWidth - gateNode.offsetWidth;
    }

    if((gateNode.offsetTop - dy) < 0) {
      dy = 0;
      gateNode.style.top = "0px";
    }

    if(gateNode.offsetTop - dy > canvasCard.offsetHeight - gateNode.offsetHeight) {
      dy = 0;
      gateNode.style.top = canvasCard.offsetHeight - gateNode.offsetHeight;
    }

    gateNode.style.top = (gateNode.style.top.substring(0, gateNode.style.top.length - 2) - dy) + "px";
    gateNode.style.left = (gateNode.style.left.substring(0, gateNode.style.left.length - 2) - dx) + "px";

    drawLines();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    drawLines();
  }
}

window.onresize = function(event) {
  for(var i = 0; i < gates.length; i++)
    fixPos(gateToHtml.get(gates[i]));
  drawLines();
}

// to create out gate
clearAll();
// to reset start challenge button
document.getElementById("startChallengeButton").disabled = false;