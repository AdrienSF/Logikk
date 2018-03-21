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
