<!DOCTYPE html>
<head>
<?php
  include_once("databaseDetails.php");
  
  if($error) exit;
  
  $name = test_input($_POST["name"]);
  $user = test_input($_POST["username"]);
  $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
  $email = test_input($_POST["email"]);
  $send_to = "signUp.html";
  $query = "INSERT INTO user_info VALUES (".$user.", ".$email.", ".$pass.", ".$name")";
  
  if ($conn->query($sql) === TRUE) {
    $send_to = "../pages/signIn.php";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
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
<meta http-equiv="refresh" content="0;url=<?php echo $send_to;?>"/>
</head>
