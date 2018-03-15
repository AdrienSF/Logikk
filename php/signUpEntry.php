<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="1;url=../home.php"/>
  <?php
    session_start();

    require_once("databaseDetails.php");
    if (isset($_POST['username'])) {
      exit();
    }

    $name = test_input($_POST["name"]);
    $user = test_input($_POST["username"]);
    // $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $pass = $_POST["password"];
    $email = test_input($_POST["email"]);

    $queryUserUnique = "SELECT * FROM user_info WHERE Username='$user'";
    $queryEmailUnique = "SELECT * FROM user_info WHERE Email='$email'";

    $_SESSION['textSignUp'] = "Welcome $name, you've made the Logikkal choice trusting us with your logic circuit!";
    if ($mysql->query($queryUserUnique)->num_rows != 0) {
      $_SESSION['textSignUp'] = "Username already exists, please try again!";
      exit();
    }

    if ($mysql->query($queryEmailUnique)->num_rows != 0) {
      $_SESSION['textSignUp'] = "Email already exists, please try again!";
      exit();
    }

    $queryInsert = "INSERT INTO user_info VALUES ('$user', '$email', '$pass', '$name')";

    if ($mysql->query($queryInsert) === FALSE) {
      $_SESSION['textSignUp'] = "Something went wrong, Please try again!";
      exit();
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
