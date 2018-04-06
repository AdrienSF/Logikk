  <?php
    session_start();

    require_once("databaseDetails.php");

    $name = test_input($_POST["name"]);
    $user = test_input($_POST["username"]);
    // $pass = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $pass = $_POST["password"];
    $email = test_input($_POST["email"]);

    // checks if email is unique
    $uniqueEmailQuery = "SELECT * FROM user_info WHERE Email='$email'";
    $res = $mysql->query($uniqueEmailQuery);

    if ($res->num_rows != 0) {
      echo "Username already in use";
      $mysql->close();
      exit();
    }

    $queryInsert = "INSERT INTO user_info VALUES ('$user','$email','$password','$name')";

    if ($mysql->query($queryInsert) === TRUE ) {
      echo "Welcome $name, you've made the Logikkal choice trusting us with your logic circuits!";
    } else {
      echo "Email already in use";
      $mysql->close();
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
