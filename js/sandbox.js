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

// Create a new gate
function makeGate(type) {
  // create a new div element
  var gateDiv = document.createElement("div");
  gateDiv.id = "gate";

  // create a new gate instance
  var gateInstance = new Gate(type);

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

  setDraggable(gateDiv, gateHeader);
}


// TODO: https://www.w3schools.com/html/html5_draganddrop.asp drag drop in/out
//below is inserted from ^
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

  sourceGate.output = targetNode;
  targetGate.inputs += sourceNode;
  console.log(targetGate.inputs);
}
//w3schools also uses a drag() function, but I don't understand it's purpose:
/*
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
*/

//end insert

// Create an element draggable, removable
function setDraggable(gate, header) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  header.onmousedown = dragMouseDown;
  header.addEventListener('contextmenu', removeGate);

  function removeGate(e) {
    e.preventDefault();

    gateToHtml.delete(htmlToGate.get(gate));
    htmlToGate.delete(gate);

    gate.parentNode.removeChild(gate);
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
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
