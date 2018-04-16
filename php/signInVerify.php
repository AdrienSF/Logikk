<?php
  session_start();
  // database connection details
  require_once("databaseDetails.php");


  //name of table
  $table = "user_info";

  if (!empty($_POST))
  {
    $uid = test_input($_POST["username"]);
    //$pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $pass = $_POST["password"];
    $query = "SELECT * FROM ".$table." WHERE Username = '".$uid."' AND Password='".$pass."'";
    $res = $mysql->query($query);
    if ($res->num_rows == 0)
    {
      $_SESSION["accepted"] = false;
      echo "Incorrect username or password.";
    }
    elseif ($res->num_rows == 1)
    {
      $_SESSION["username"] = $uid;
      $_SESSION["accepted"] = true;
      echo "Welcome to Logikk!";
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
