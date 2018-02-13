let INPUT  = "INPUT";
let AND    = "AND";
let OR     = "OR";
let XOR    = "XOR";
let NOT    = "NOT";

class Gate {
  // type may be INPUT, AND, OR, XOR, NOT
  constructor(type) {
    this.type = type;
    this.inputs = [];
    this.output = null;
  }

  // recursive function goes here
  // to get state
}

// HTML node <-> Gate instance map
let htmlToGate = new Map();
let gateToHtml = new Map();
let gates = [];

// Create a new gate
function makeGate(type) {
  // create a new div element
  var gateNode = document.createElement("div");
  gateNode.id = "gate";

  // create a new gate instance
  var gateInst = new Gate(type);
  gates.push(gateInst);

  htmlToGate.set(gateNode, gateInst);
  gateToHtml.set(gateInst, gateNode);

  var gateHeaderNode = document.createElement("div");
  gateHeaderNode.innerHTML = type;
  gateHeaderNode.id = "gateheader";
    gateNode.appendChild(gateHeaderNode);

  if(type != INPUT) {
    var inputsNode = document.createElement("div");
    inputsNode.className = "column";
    inputsNode.innerHTML = "<img id=\"nodein\" src=\"../images/node.png\" draggable=\"false\" ondrop=\"dropped(event)\" ondragover=\"allowDrop(event)\" width=\"16\" height=\"16\">";
    gateNode.appendChild(inputsNode);
  }

  var outputNode = document.createElement("div");
  outputNode.className = "column";
  outputNode.innerHTML = "<img id=\"nodeout\" src=\"../images/node.png\" draggable=\"true\" width=\"16\" height=\"16\">";
  gateNode.appendChild(outputNode);

  var canvas = document.getElementById("canvas");
  canvas.appendChild(gateNode);

  setupGate(gateNode, gateHeaderNode);
}

function disconnectGates(sourceInst, targetInst) {
  // source outputs into target
  targetInst.inputs.splice(targetInst.inputs.indexOf(sourceInst), 1);
  sourceInst.output = null;
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
    if(gates[i].output) {
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      var sourceInst = gates[i];
      var targetInst = gates[i].output;

      var sourceNode = gateToHtml.get(gates[i]);
      var targetNode = gateToHtml.get(gates[i].output);

      var lineStartPos = getPos(sourceNode.querySelector("#nodeout"));
      var lineEndPos = getPos(targetNode.querySelector("#nodein"));
      var svgpos = getPos(svgcanvas);

      line.setAttribute('x1', lineStartPos.x - svgpos.x + 8);
      line.setAttribute('y1', lineStartPos.y - svgpos.y + 8);
      line.setAttribute('x2', lineEndPos.x - svgpos.x + 8);
      line.setAttribute('y2', lineEndPos.y - svgpos.y + 8);
      line.setAttribute('stroke', 'gray');
      line.setAttribute('stroke-width', '4');

      svgcanvas.appendChild(line);
    }
  }
}

function allowDrop(e) {
  // prevent default handling of drop
  e.preventDefault();
}

function dropped(e) {
  e.preventDefault();
  var sourceNode = e.dataTransfer.mozSourceNode.parentNode.parentNode;
  var targetNode = e.target.parentNode.parentNode;

  if(sourceNode === targetNode) {
    console.log("wtf");
    return;
  }

  // sourceNode is the output
  // targetNode is the input
  var sourceInst = htmlToGate.get(sourceNode);
  var targetInst = htmlToGate.get(targetNode);

  if(sourceInst.output)
    disconnectGates(sourceInst, sourceInst.output);

  sourceInst.output = targetInst;
  targetInst.inputs.push(sourceInst);

  drawLines();
}

// Create an element draggable, removable
function setupGate(gateNode, headerNode) {
  headerNode.onmousedown = dragMouseDown;
  headerNode.addEventListener('contextmenu', removeGate);

  function removeGate(e) {
    e.preventDefault();

    var gateInst = htmlToGate.get(gateNode);

    // remove all connections to other gates
    if(gateInst.output)
      gateInst.output.inputs.splice(gateInst.output.inputs.indexOf(gateInst), 1);

    for(var i = 0; i < gateInst.inputs.length; i++)
      gateInst.inputs[i].output = null;

    // remove this from gates array
    for(var i = 0; i < gates.length; i++) {
      if(gates[i] == gateInst) {
        gates.splice(i, 1);
        break;
      }
    }

    gateToHtml.delete(gateInst);
    htmlToGate.delete(gateNode);

    gate.parentNode.removeChild(gateNode);

    drawLines();
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
