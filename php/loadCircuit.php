<?php
  session_start();
  require_once 'databaseDetails.php';
  require_once 'testInput.php';

  $circuitName = test_input($_POST['loadName']);

  $queryLoadCircuit = "SELECT * FROM save_circuits WHERE Username = '".$_SESSION['username']."' AND Circuit_name = '".$circuitName."'";

  $res = $mysql->query($queryLoadCircuit);

  if ($res->num_rows == 1) {
    $row = $res->fetch_assoc();
    echo $row['Circuit_text'];
  } else {
    echo "Sorry something went wrong!";
  }

  $mysql->close();
?>
