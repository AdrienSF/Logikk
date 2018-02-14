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
      console.log("Can't evaluate, no inputs");
      this.state = false;
      return false;
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

// HTML node <-> Gate instance map
let htmlToGate = new Map();
let gateToHtml = new Map();
let gates = [];
// outInst is the output gate instance
let outInst = null;

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

  var gateHeaderNode = document.createElement("div");
  gateHeaderNode.innerHTML = type;
  gateHeaderNode.id = "gateheader";
  gateNode.appendChild(gateHeaderNode);

  if(type != IN) {
    var inputsNode = document.createElement("div");
    inputsNode.className = "column";
    inputsNode.innerHTML = "<img id=\"nodein\" src=\"../images/node.png\" draggable=\"false\" ondrop=\"dropped(event)\" ondragover=\"allowDrop(event)\" width=\"16\" height=\"16\">";
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
  }

  if(type != OUT) {
    var outputNode = document.createElement("div");
    outputNode.className = "column";
    outputNode.innerHTML = "<img id=\"nodeout\" src=\"../images/node.png\" draggable=\"true\" width=\"16\" height=\"16\">";
    gateNode.appendChild(outputNode);
  }

  var canvas = document.getElementById("canvas");
  canvas.appendChild(gateNode);

  setupGate(gateNode, gateHeaderNode);
}

function update() {
  // this updates their state instance variable so we can use precalculated state
  // that way we dont do unecessary calculations
  for(var i = 0; i < gates.length; i++)
    gates[i].getState();

  drawLines();
  createTruthTable();
}

function disconnectGates(sourceInst, targetInst) {
  // source outputs into target
  targetInst.inputs.splice(targetInst.inputs.indexOf(sourceInst), 1);
  sourceInst.outputs.splice(sourceInst.outputs.indexOf(targetInst), 1);
}

function clearAll() {
  htmlToGate.clear();
  gateToHtml.clear();
  gates = [];

  var cnv = document.getElementById("canvas");
  while(cnv.firstChild)
    cnv.removeChild(cnv.firstChild);

  update();
  makeGate(OUT);
}

function drawLines() {
  function getPos(e) {
    // returns pos on screen
    var rect = e.getBoundingClientRect();
    return {x: rect.left, y: rect.top};
  }

  var svgcanvas = document.getElementById("svgcanvas");

  // clear canvas children
  while (svgcanvas.firstChild)
    svgcanvas.removeChild(svgcanvas.firstChild);

  for(var i = 0; i < gates.length; i++) {
    for(var j = 0; j < gates[i].outputs.length; j++) {
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      var sourceInst = gates[i];
      var targetInst = gates[i].outputs[j];

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

      var state = sourceInst.getStatePrecalculated();
      if(state) line.setAttribute('stroke', 'red');
      else line.setAttribute('stroke', 'black');

      svgcanvas.appendChild(line);
    }
  }
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

  if(outInst.inputs > 0)
    createTruthTable();

  update();
}

function createTruthTable() {
  var inputsInst = [];
  for(var i = 0; i < gates.length; i++) {
    if(gates[i].type == IN)
      inputsInst.push(gates[i]);
  }
/*
  for (j = 1; j <= inputInst.length; j++) {
    var inputCell = document.createElement("td");
    var inputText = document.createTextNode("input" + j);
    inputCell.appendChild(inputText);
    document.getElementById("TThead").appendChild(inputCell);
  }
  //display out in table header
  var outCell = document.createElement("td");
  var outText = document.createTextNode("out");
  outCell.appendChild(outText);
  document.getElementById("TThead").appendChild(outCell);

  //display table body
  for (i = 1; i <= Math.pow(2, inputGates); i++) {
    var stateRow = document.createElement("tr");
    for (j = 1; j <= inputGates; j++) {
      var stateCell = document.createElement("td");
      var stateText = document.createTextNode("" + i + "," + j);
      stateCell.appendChild(stateText);
      stateRow.appendChild(stateCell);
    }
    var outStateCell = document.createElement("td");
    var outStateText = document.createTextNode("out" + i);
    outStateCell.appendChild(outStateText);
    stateRow.appendChild(outStateCell);

    document.getElementById("TTbody").appendChild(stateRow);
  }*/
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

    gateNode.parentNode.removeChild(gateNode);

    update();
  }

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  function dragMouseDown(e) {
    e.preventDefault();
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    gateNode.style.top = (gateNode.offsetTop - pos2) + "px";
    gateNode.style.left = (gateNode.offsetLeft - pos1) + "px";
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
clearAll();
