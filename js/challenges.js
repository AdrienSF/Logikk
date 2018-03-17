
for (var i = 1; i <= 10; i++)
{

  var row = document.createElement("div");
  row.className = "row clearfix";

  for (var j = 1; j <= 3; j++)
  {
    var challengeID = "" + i + "," + j;

    var column = document.createElement("div");
    column.className = "col-lg-4 col-md-4 col-sm-4 col-xs-4";
    var link = document.createElement("a");
    link.href = "challenge.html?i=" + i + "&j=" + j;
    link.style = "color: #F9F9F9"
    var card = document.createElement("div");
    card.className = "card";
    card.style = getBackgroundColor(challengeID);/*determined from num of inputs*/
    var h3 = document.createElement("h3");
    h3.className = "text-center";
    var headerText = document.createTextNode(getChallengeTitle(challengeID));
    var p = document.createElement("p");
    p.className = "text-center";
    var descriptionText = document.createTextNode(getChallengeDescription(challengeID));

    h3.appendChild(headerText);
    p.appendChild(descriptionText);
    card.appendChild(h3);
    card.appendChild(p);
    link.appendChild(card);
    column.appendChild(link);
    row.appendChild(column);

  }

  document.getElementById("challengeCards").appendChild(row);

}

function getBackgroundColor(challengeID)
{
  var inputs = 2;//get number of inputs from a table called challengeID in database if it exists
  var colorCode = "F9F9F9";
  if (inputs === 2) colorCode = "5CB85C";//should really be switch/case
  if (inputs === 3) colorCode = "5BC0DE";
  if (inputs === 4) colorCode = "428BCA";
  if (inputs === 5) colorCode = "D9534F";

  return "background-color: #" + colorCode;
}

function getChallengeTitle(challengeID)
{
  if (true/*challenge exists*/) return challengeID;//get challenge title from db
  else return "Empty slot";
}

function getChallengeDescription(challengeID)
{
  if (true/*challenge exists*/) return "ayeayeayayayayyyyaeayeyeaeyayyy";//get challenge description from db
  else return "A challenge for this slot has not yet been made.";
}
