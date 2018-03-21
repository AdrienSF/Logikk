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

  document.cookie = "";

  var cnv = document.getElementById("canvas");
  while(cnv.firstChild)
    cnv.removeChild(cnv.firstChild);

  createTruthTable();
  update();
  makeGate(OUT);
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

// to create out gate
clearAll(true);
