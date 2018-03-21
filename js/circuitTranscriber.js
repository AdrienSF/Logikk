function saveCircuit() {
  var obj = {};

  for(var i = 0; i < gates.length; i++) {
    obj[i] = {"type":gates[i].type};
    obj[i].x = parseInt(gateToHtml.get(gates[i]).style.left, 10) / canvasCard.offsetWidth;
    obj[i].y = parseInt(gateToHtml.get(gates[i]).style.top, 10) / canvasCard.offsetHeight;
    obj[i].inputs = [];

    for(var inputIndex = 0; inputIndex < gates[i].inputs.length; inputIndex++) {
      var input = gates[i].inputs[inputIndex];
      obj[i].inputs.push(gates.indexOf(input));
    }
  }

  return JSON.stringify(obj);
}

function loadCircuit(data) {
  clearAll(true);
  var obj = JSON.parse(data);

  for(var i = 0; obj[i] != null; i++) {
    var gateInst, gateNode;
    if(obj[i].type == OUT)
      gateInst = outInst;
    else
      gateInst = makeGate(obj[i].type);

    gateNode = gateToHtml.get(gateInst);

    gateNode.style.left = (obj[i].x * canvasCard.offsetWidth) + "px";
    gateNode.style.top = (obj[i].y * canvasCard.offsetHeight) + "px";
  }

  for(var i = 0; i < gates.length; i++) {
    var targetInst = gates[i];
    for(var inputIndex = 0; inputIndex < obj[i].inputs.length; inputIndex++) {
      var sourceInst = gates[obj[i].inputs[inputIndex]];
      connectGates(sourceInst, targetInst);
    }
  }

  update();
}

setInterval(updateCookie, 1000);
function updateCookie() {
  if(hasLoaded)
    document.cookie = saveCircuit();
}

var hasLoaded = false;
window.onload = function() {
  if(document.cookie.indexOf(";") != -1)
    loadCircuit(document.cookie.substring(0, document.cookie.indexOf(";")));
  hasLoaded = true;
}
