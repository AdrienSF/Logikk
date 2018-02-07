function makeGate() {
  // create a new div element
  var newGate = document.createElement("div");
  newGate.id = "gate";

  var newGateHeader = document.createElement("div");
  newGateHeader.innerHTML = "Hi";
  newGateHeader.id = "gateheader";

  var content = document.createTextNode("Hi");
  newGate.appendChild(newGateHeader);
  newGate.appendChild(content);

  var currentDiv = document.getElementById("canvas");
  currentDiv.appendChild(newGate);

  dragElement(newGate, newGateHeader);
}

function dragElement(gate, header) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
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
