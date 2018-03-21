// HTML node <-> Gate instance map
let htmlToGate = new Map();
let gateToHtml = new Map();
let gates = [];
// outInst is the output gate instance
let outInst = null;

// this maps a html gate node to the output image (so we can change on/off)
let outImage = new Map();

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
  gateHeaderNode.innerHTML = gateInst.type;
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
    outputNode.innerHTML = "<img id=\"nodeout\" src=\"../images/nodeoff.png\" draggable=\"true\" ondragstart=\"dragStart(event)\" width=\"16\" height=\"16\">";
    gateNode.appendChild(outputNode);
    outImage.set(gateNode, outputNode.firstChild);
  }

  var canvas = document.getElementById("canvas");
  canvas.appendChild(gateNode);

  setupGate(gateNode, gateHeaderNode);

  // need this update to update output node, for example for not, it's on by default
  update();
}

var elementBeingDragged;
function dragStart(e) {
  elementBeingDragged = e.target.parentNode.parentNode;
}

function dropped(e) {
  e.preventDefault();

  var sourceNode = elementBeingDragged;
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

  if(targetInst.inputs.length >= targetInst.inputLimit) {
    alert("This gate has already reached its input limit.");
    return;
  }

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

window.onresize = function() {
  for(var i = 0; i < gates.length; i++) {
    var gateNode = gateToHtml.get(gates[i]);

    if(gateNode.offsetLeft < 0)
      gateNode.style.left = "0px";

    if(gateNode.offsetLeft > canvasCard.offsetWidth - gateNode.offsetWidth)
      gateNode.style.left = (canvasCard.offsetWidth - gateNode.offsetWidth) + "px";

    if(gateNode.offsetTop < 0)
      gateNode.style.top = "0px";

    if(gateNode.offsetTop > canvasCard.offsetHeight - gateNode.offsetHeight)
      gateNode.style.top = (canvasCard.offsetHeight - gateNode.offsetHeight) + "px";
  }

  drawLines();
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

function allowDrop(e) {
  // prevent default handling of drop
  e.preventDefault();
}
