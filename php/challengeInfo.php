<?php
  require_once("databaseDetails.php");
  if($error) exit;

  $query = "SELECT * FROM challenges WHERE id=\"" . $_GET['id'] . "\"";
  echo $query;
  $result = $mysql->query($query);
  $row = $result->fetch_assoc();

  if($row) {
    // works
  } else {
    // broken
  }
?>

<script>
  var challengeName = "<?php echo $row['name']; ?>";
  var challengeDescription = "<?php echo $row['description']; ?>";

  var goalInputs  = <?php echo $row['in']; ?>;
  var maxANDgates = <?php echo $row['and']; ?>;
  var maxORgates  = <?php echo $row['or']; ?>;
  var maxXORgates = <?php echo $row['xor']; ?>;
  var maxNOTgates = <?php echo $row['not']; ?>;
  var goalTable = "<?php echo $row['truth_table']; ?>";

  document.getElementById("challengeHeader").appendChild(document.createTextNode(challengeName));
  document.getElementById("challengeDescription").appendChild(document.createTextNode(challengeDescription));
  document.getElementById("goalInputs").innerHTML = goalInputs;
  document.getElementById("winMessage").innerHTML = winMessage;

  var andLine = document.createElement("li");
  andLine.innerHTML = maxANDgates + " AND gates";
  var orLine = document.createElement("li");
  orLine.innerHTML = maxORgates + " OR gates";
  var xorLine = document.createElement("li");
  xorLine.innerHTML = maxXORgates + " XOR gates";
  var notLine = document.createElement("li");
  notLine.innerHTML = maxNOTgates + " NOT gates";

  if (maxANDgates && maxANDgates > 0) document.getElementById("restrictions").appendChild(andLine);
  if (maxORgates && maxORgates > 0) document.getElementById("restrictions").appendChild(orLine);
  if (maxXORgates && maxXORgates > 0) document.getElementById("restrictions").appendChild(xorLine);
  if (maxNOTgates && maxNOTgates > 0) document.getElementById("restrictions").appendChild(notLine);
</script>
