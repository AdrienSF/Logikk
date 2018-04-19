<?php
  session_start();
  require_once 'databaseDetails.php';
  require_once 'testInput.php';

  $circuitName = test_input($_POST['loadName']);

  $queryDeleteCircuit = "DELETE FROM save_circuits WHERE Username ='".$_SESSION['username']."' AND Circuit_name = '".$circuitName."'";

  $res = $mysql->query($queryDeleteCircuit);

  if ($res) {
    echo $circuitName." deleted!";
  } else {
    echo "Something went wrong";
  }

  $mysql->close();
?>
