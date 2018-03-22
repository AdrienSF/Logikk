<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="1;url=../home.php"/>
  <?php
    session_start();

    require_once("databaseDetails.php");

    $name = test_input($_POST["name"]);
    $user = test_input($_POST["username"]);
    // $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $pass = $_POST["password"];
    $email = test_input($_POST["email"]);

    $queryInsert = "INSERT INTO user_info VALUES ('$user','$email','$password','$name')";

    if ($mysql->query($queryInsert) === TRUE ) {
      $_SESSION['textSignUp'] = "Welcome $name, you've made the Logikkal choice trusting us with your logic circuit!";
    } else {
      $_SESSION['textSignUp'] = "Email or Username is not Unique!";
      $mysql->close();
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

</head>
<body>
</body>
</html>
