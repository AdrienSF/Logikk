<!DOCTYPE html>
<head>
<?php
  // database connection details
  $servername = "dbhost.cs.man.ac.uk";
  $username = "a54832bs";
  $password = "jSgsSnTMF96ceUKm";
  $table="2017_comp10120_m4";

  // Create connection
  $mysql = new mysqli($servername, $username, $password);

  // Check connection
  if ($mysql->connect_error) {
      die("Connection failed: " . $mysql->connect_error);
  }


  if (!empty($_POST))
  {
    $uid = test_input($_POST["username"]);
    $pass = test_input($_POST["password"]);
    $query = "SELECT * FROM $table WHERE user = '$uid' AND pass = '$pass''"
    $res = $mysql->query($query);
    if ($res->num_rows == 0)
    {
      $send_to = "index.php";
    }
    else
    {
      $send_to = "home.html";
    }
  }
  else
  {
    $send_to = "index.php";
  }
  

  function test_input($data) 
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  
?>
<meta http-equiv="refresh" content="0;url=<?php echo $send_to?>"/>
</head>

