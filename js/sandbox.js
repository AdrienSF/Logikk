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

// HTML div <-> Gate instance map
let htmlToGate = new Map();
let gateToHtml = new Map();
let gates = [];

// Create a new gate
function makeGate(type) {
  // create a new div element
  var gateDiv = document.createElement("div");
  gateDiv.id = "gate";

  // create a new gate instance
  var gateInstance = new Gate(type);
  gates.push(gateInstance);

  htmlToGate.set(gateDiv, gateInstance);
  gateToHtml.set(gateInstance, gateDiv);

  var gateHeader = document.createElement("div");
  gateHeader.innerHTML = type;
  gateHeader.id = "gateheader";

  var inputs = document.createElement("div");
  inputs.className = "column";
  inputs.innerHTML = "<img id=\"nodein\" src=\"../images/node.png\" draggable=\"false\" ondrop=\"dropped(event)\" ondragover=\"allowDrop(event)\" width=\"16\" height=\"16\">";

  var output = document.createElement("div");
  output.className = "column";
  output.innerHTML = "<img id=\"nodeout\" src=\"../images/node.png\" draggable=\"true\" width=\"16\" height=\"16\">";

  gateDiv.appendChild(gateHeader);
  gateDiv.appendChild(inputs);
  gateDiv.appendChild(output);

  var canvas = document.getElementById("canvas");
  canvas.appendChild(gateDiv);

  setupGate(gateDiv, gateHeader);
}

function disconnectGates(source, target) {
  // source outputs into target
  target.inputs.splice(target.inputs.indexOf(source), 1);
  source.output = null;
}

function drawLines() {
  function getPos(e) {
    var rect = e.getBoundingClientRect();
    return {x: rect.left, y: rect.top};
  }

  var svgcanvas = document.getElementById("svgcanvas");

  while (svgcanvas.firstChild)
    svgcanvas.removeChild(svgcanvas.firstChild);

  for(var i = 0; i < gates.length; i++) {
    // <line x1="20" y1="100" x2="100" y2="500" stroke-width="2" stroke="black"/>

    if(gates[i].output) {
      var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      var sourceInstance = gates[i];
      var targetInstance = gates[i].output;

      var sourceGate = gateToHtml.get(gates[i]);
      var targetGate = gateToHtml.get(gates[i].output);

      var pos1 = getPos(sourceGate.querySelector("#nodeout"));
      var pos2 = getPos(targetGate.querySelector("#nodein"));
      var svgpos = getPos(svgcanvas);

      line.setAttribute('x1', pos1.x - svgpos.x + 8);
      line.setAttribute('y1', pos1.y - svgpos.y + 8);
      line.setAttribute('x2', pos2.x - svgpos.x + 8);
      line.setAttribute('y2', pos2.y - svgpos.y + 8);
      line.setAttribute('stroke', 'gray');
      line.setAttribute('stroke-width', '4');

      /* THIS WORKS BUT NOT RIGHT LINES... comment for now
      line.addEventListener('click', function (event) {
        disconnectGates(sourceInstance, targetInstance);
        drawLines();
      }, true); */

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
  var sourceGate = htmlToGate.get(sourceNode);
  var targetGate = htmlToGate.get(targetNode);

  sourceGate.output = targetGate;
  targetGate.inputs.push(sourceGate);

  drawLines();
}


// Create an element draggable, removable
function setupGate(gate, header) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  header.onmousedown = dragMouseDown;
  header.addEventListener('contextmenu', removeGate);

  function removeGate(e) {
    e.preventDefault();

    var gateInstance = htmlToGate.get(gate);

    // remove all connections to other gates
    if(gateInstance.output)
      gateInstance.output.inputs.splice(gateInstance.output.inputs.indexOf(gateInstance), 1);

    for(var i = 0; i < gateInstance.inputs.length; i++)
      gateInstance.inputs[i].output = null;

    // remove this from gates array
    for(var i = 0; i < gates.length; i++) {
      if(gates[i] == gateInstance) {
        gates.splice(i, 1);
        break;
      }
    }

    gateToHtml.delete(gateInstance);
    htmlToGate.delete(gate);

    gate.parentNode.removeChild(gate);

    drawLines();
  }

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
    gate.style.top = (gate.offsetTop - pos2) + "px";
    gate.style.left = (gate.offsetLeft - pos1) + "px";

    drawLines();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    drawLines();
  }
}
