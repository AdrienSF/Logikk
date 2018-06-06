var row = document.getElementById("challengeCards");

function appendChallenge(id, name, description, complexity) {
  var column = document.createElement("div");
  column.className = "col-lg-4 col-md-4 col-sm-4 col-xs-4";

  var link = document.createElement("a");
  link.href = "challenge.php?id=" + id;
  link.style = "color: #F9F9F9";

  var card = document.createElement("div");
  card.className = "card";
  card.style = getBackgroundColor(complexity);

  var h3 = document.createElement("h3");
  h3.className = "text-center";

  var headerText = document.createTextNode(name);
  var p = document.createElement("p");
  p.className = "text-center";

  var descriptionText = document.createTextNode(description);

  h3.appendChild(headerText);
  p.appendChild(descriptionText);
  card.appendChild(h3);
  card.appendChild(p);
  link.appendChild(card);
  column.appendChild(link);
  row.appendChild(column);
}

function getBackgroundColor(complexity)
{
  var inputs = complexity;
  var colorCode = "F9F9F9";
  if (inputs === 2) colorCode = "5CB85C";
  if (inputs === 3) colorCode = "5BC0DE";
  if (inputs === 4) colorCode = "428BCA";
  if (inputs === 5) colorCode = "D9534F";

  return "background-color: #" + colorCode;
}
