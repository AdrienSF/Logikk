var challengeData; // challenge data

// This one is on challenge library
function loadChallengeBtnClicked() {
  var data = document.getElementById("challengeCode").value;
  console.log(data);
  postLoadChallenge(data);
}

// On Sandbox
function makeChallengeBtnClicked() {
  document.getElementById("challengeCode").value = saveChallenge();
}


// Get JSON
function saveChallenge() {
  hasUpdatedOutSuccessfully = true;
  outInst.getState();
  if(!hasUpdatedOutSuccessfully) {
    alert("This is not properly connected");
    return;
  }

  var obj = {};

  var inputCount = 0, andCount = 0,  orCount = 0, xorCount = 0, notCount = 0;
  for(var i = 0; i < gates.length; i++) {
    if (gates[i].type == IN) inputCount++;
    if (gates[i].type == AND) andCount++;
    if (gates[i].type == OR) orCount++;
    if (gates[i].type == XOR) xorCount++;
    if (gates[i].type == NOT) notCount++;
  }

  obj.in = inputCount;
  obj.and = andCount;
  obj.or = orCount;
  obj.xor = xorCount;
  obj.not = notCount;

  updateTableStates();
  var tt = "";
  for(var i = 0; i < outStateText.length; i++)
    tt += outStateText[i].nodeValue;

  obj.truth_table = tt;

  return JSON.stringify(obj);
}

// Load based on object containing values in fields
function loadChallenge(obj) {
  challengeData = obj;

  if(!challengeData.name) challengeData.name = "Custom Challenge";
  if(!challengeData.win_text) challengeData.win_text = "Congratulations!";

  document.getElementById("challengeHeader").appendChild(document.createTextNode(challengeData.name));
  document.getElementById("challengeDescription").appendChild(document.createTextNode(challengeData.description));
  document.getElementById("goalInputs").innerHTML = challengeData.in;
  document.getElementById("winMessage").innerHTML = challengeData.win_text;

  var andLine = document.createElement("li");
  andLine.innerHTML = challengeData.and + " AND gates";
  var orLine = document.createElement("li");
  orLine.innerHTML = challengeData.or + " OR gates";
  var xorLine = document.createElement("li");
  xorLine.innerHTML = challengeData.xor + " XOR gates";
  var notLine = document.createElement("li");
  notLine.innerHTML = challengeData.not + " NOT gates";

  if (challengeData.and > 0) document.getElementById("restrictions").appendChild(andLine);
  if (challengeData.or  > 0) document.getElementById("restrictions").appendChild(orLine);
  if (challengeData.xor > 0) document.getElementById("restrictions").appendChild(xorLine);
  if (challengeData.not > 0) document.getElementById("restrictions").appendChild(notLine);
}


// Helper method to submit post (for load challenge from library)
function postLoadChallenge(arg) {
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "challenge.php");

  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "data");
  hiddenField.setAttribute("value", arg);

  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
}
