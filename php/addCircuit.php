<?php
  session_start();
  require_once 'databaseDetails.php';

  $circuitText = $_POST['circuit'];
  $circuitName = test_input($_POST['name']);

  $queryCircuitAdd = "INSERT INTO save_circuits VALUES ('".$_SESSION['username']."','".$circuitName."','".$circuitText."')";
  $res = $mysql->query($queryCircuitAdd);

  function test_input($data)
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>
