let IN     = "IN";
let OUT    = "OUT";
let AND    = "AND";
let OR     = "OR";
let XOR    = "XOR";
let NOT    = "NOT";

let COLOR_BROKEN = "#9900ff";
let COLOR_CORRECT = "#2196F3";

class Gate {
  // type may be IN, AND, OR, XOR, NOT
  constructor(type) {
    this.type = type;

    this.inputs = [];
    this.outputs = [];

    if(this.type == IN)
      this.state = false;

    if(this.type == IN) {
      this.inputLimit = 0;
    } else if(this.type == OUT) {
      this.inputLimit = 1;
    } else if(this.type == AND) {
      this.inputLimit = 2;
    } else if(this.type == OR) {
      this.inputLimit = 2;
    } else if(this.type == XOR) {
      this.inputLimit = 2;
    } else if(this.type == NOT) {
      this.inputLimit = 1;
    }
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

    if(inputs.length != this.inputLimit) {
      hasUpdatedOutSuccessfully = false;

      if(type == NOT)
        this.state = true;
      else
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

  constructBoolExpr() {
    var type = this.type;
    var inputs = this.inputs;
    var outputs = this.outputs;

    if(type == IN) {
      return gateToHtml.get(this).firstChild.innerHTML;
    }

    if(inputs.length == 0) {
      return "err";
    }

    if(type == OUT) {
      return inputs[0].constructBoolExpr();
    }

    if(type == AND) {
      var expr = "";

      // first one
      if(inputs[0].type == IN) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN) expr += "∧" + inputs[i].constructBoolExpr();
        else expr += "∧(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == OR) {
      var expr = "";

      // first one
      if(inputs[0].type == IN) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN) expr += "∨" + inputs[i].constructBoolExpr();
        else expr += "∨(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == XOR) {
      var expr = "";

      // first one
      if(inputs[0].type == IN) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN) expr += "^" + inputs[i].constructBoolExpr();
        else expr += "^(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == NOT) {
      if(inputs[0].type == IN) return "¬" + inputs[0].constructBoolExpr();
      else return "¬(" + inputs[0].constructBoolExpr() + ")";
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

    createTruthTable();
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

  updateInputButton();
  updateOutImage();
  drawLines();
  updateTableStates();
  updateBoolExpr();
  updateGateColours();
  if(typeof updateButtonDisabling == 'function')
    updateButtonDisabling();
}

function updateInputButton() {
  var inputsInst = [];
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
    if (inputsInst.length >= 8)
    document.getElementById("inputButton").disabled = true;
    else
    document.getElementById("inputButton").disabled = false;
  }
}

function disconnectGates(sourceInst, targetInst) {
  // source outputs into target
  targetInst.inputs.splice(targetInst.inputs.indexOf(sourceInst), 1);
  sourceInst.outputs.splice(sourceInst.outputs.indexOf(targetInst), 1);
}

function clearAll(override) {
  if(!override && !confirm("Are you sure you want to Clear All?")) return;

  htmlToGate.clear();
  gateToHtml.clear();
  outImage.clear();
  gates = [];

  var cnv = document.getElementById("canvas");
  while(cnv.firstChild)
    cnv.removeChild(cnv.firstChild);

  createTruthTable();
  update();
  makeGate(OUT);
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
  if(targetInst.inputs.length >= targetInst.inputLimit)
    disconnectGates(targetInst.inputs[0], targetInst);

  sourceInst.outputs.push(targetInst);
  targetInst.inputs.push(sourceInst);

  if(hasCycles(targetInst)) {
    disconnectGates(sourceInst, targetInst);
    alert("You are trying to create a cycle!");
    return;
  }

  if(outInst.inputs > 0) {
    createTruthTable();
    createInputLabels();
  }

  update();
}

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
    outStateText.push(document.createTextNode("F"));
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

function updateBoolExpr() {
  if(outInst && gateToHtml.get(outInst)) {
    hasUpdatedOutSuccessfully = true;
    outInst.getState();
  } else return;

  if(hasUpdatedOutSuccessfully) {
    document.getElementById("boolExp").innerHTML = outInst.constructBoolExpr();
  } else {
    document.getElementById("boolExp").innerHTML = "out not connected";
  }
}

function updateGateColours() {
  if(!outInst || !gateToHtml.get(outInst)) return;

  for(var i = 0; i < gates.length; i++) {
    if(gates[i].inputs.length != gates[i].inputLimit) {
      gateToHtml.get(gates[i]).firstChild.style.backgroundColor = COLOR_BROKEN;
    } else {
      gateToHtml.get(gates[i]).firstChild.style.backgroundColor = COLOR_CORRECT;
    }
  }


  // out is special because we are checking whether it properly connects recursively
  outInst.getState();
  if(!hasUpdatedOutSuccessfully) {
    gateToHtml.get(outInst).firstChild.style.backgroundColor = COLOR_BROKEN;
  } else {
    gateToHtml.get(outInst).firstChild.style.backgroundColor = COLOR_CORRECT;
  }
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

    updateInputButton();
    createTruthTable();
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

// to create out gate
clearAll(true);
