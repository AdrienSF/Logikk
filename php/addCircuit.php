<?php
  session_start();
  require_once 'databaseDetails.php';

  $circuitText = $_POST['circuit'];
  $circuitName = test_input($_POST['name']);

  $queryCheckName = "SELECT * FROM save_circuits WHERE Username = '".$_SESSION['username']."' AND Circuit_name ='".$circuitName."'";

  $resName = $mysql->query($queryCheckName);

  if ($resName->num_rows > 0) {
    echo "Sorry this name already exists!";
    exit();
  }

  $queryCircuitAdd = "INSERT INTO save_circuits VALUES ('','".$_SESSION['username']."','".$circuitName."','".$circuitText."')";
  $res = $mysql->query($queryCircuitAdd);

  if ($res) {
    echo "Your circuit has been added";
  } else {
    echo "Sorry something went wrong";
  }

  $mysql->close();

  function test_input($data)
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>
