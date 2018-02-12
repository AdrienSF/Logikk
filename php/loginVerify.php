<!DOCTYPE html>
<head>
<?php
  // database connection details
  $servername = "dbhost.cs.man.ac.uk";
  $username = "a54832bs";
  $password = "jSgsSnTMF96ceUKm";
  $db_name="2017_comp10120_m4";
  $alert = "";

  // Create connection
  $mysql = new mysqli($servername, $username, $password,$db_name);


  // Check connection
  if ($mysql->connect_error) {
      die("Connection failed: " . $mysql->connect_error);
  }
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
      $alert = "Incorrect Username or password!";
      $send_to = "/logikk/index.php";
    }
    else
    {
      $send_to = "/logikk/home.php";
      
      $cookie_name = "username";
      $cookie_value = "$uid";
      setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
    }
  }
  else
  {
    $alert = "Incorrect Username or password!";
    $send_to = "/logikk/index.php";
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
<!--<script>
if(!(<?php //echo $alert?> == ""))
{
  alert(<?php //echo $alert?>);
}
</script>--!>
</head>

