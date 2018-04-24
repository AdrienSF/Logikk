<?php
  session_start();
  // database connection details
  require_once("databaseDetails.php");


  //name of table
  $table = "user_info";

  if (!empty($_POST))
  {
    $uid = test_input($_POST["username"]);
    $pass = $_POST["password"];
    // $pass = $_POST["password"];
    $query = "SELECT * FROM ".$table." WHERE Username = '".$uid."'";
    $res = $mysql->query($query);
    $resultArray = $res->fetch_assoc();

    if ($res->num_rows == 0)
    {
      $_SESSION["accepted"] = false;
      echo "Incorrect username or password.";
    }
    elseif ($res->num_rows == 1)
    {
      if (password_verify($pass, $resultArray['Password'])) {
        $_SESSION["username"] = $uid;
        echo "Welcome to Logikk!";
      } else {
        echo "Incorrect username or password.";
      }
    }
    else
    {
      $_SESSION["accepted"] = false;
      echo "Something went wrong!";
    }
  }
  else
  {
    $send_to = "../pages/signIn.php";
    $_SESSION["accepted"] = false;
    echo "Incorrect username or password.";
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
