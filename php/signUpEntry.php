<!DOCTYPE html>
<head>
<?php
  include_once("databaseDetails.php");

  $name = test_input($_POST["name"]);
  $user = test_input($_POST["username"]);
  $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
  $email = test_input($_POST["email"]);
  $send_to = "signUp.html";

  $queryUniqueUser = "SELECT * FROM user_info WHERE Username='" . $user . "'";
  $resUniqueUser = $mysql->query($queryUniqueUser);
  $queryUniqueEmail = "SELECT * FROM user_info WHERE Email='" . $email . "'";
  $resUniqueEmail = $mysql->query($queryUniqueEmail);

  if ($resUniqueUser->num_rows != 0) {
    $_SESSION['textSignUp'] = "Sorry, Username is taken.";
    $mysql->close();
    exit();
  }

  if ($resUniqueUser->num_rows != 0) {
    $_SESSION['textSignUp'] = "Sorry, Email is taken.";
    $mysql->close();
    exit();
  }

  $query = "INSERT INTO user_info VALUES (".$user.", ".$email.", ".$pass.", ".$name")";

  if ($mysql->query($query) === TRUE) {
    $_SESSION['textSignUp'] = "Welcome to the beautiful world of Logikk " . $name . ". Please sign in to continue using user priviliges";
  } else {
    $_SESSION['textSignUp'] = "Sorry, Something went wrong!";
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
<meta http-equiv="refresh" content="0;url=../home.php"/>
</head>
