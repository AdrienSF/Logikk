<!DOCTYPE html>
<html lang="en-GB">

<!-- Bootstrap CDN -->
     <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <head>
    <link rel="stylesheet" href="form.css">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Login </title>
  </head>

<?php
  $servername = "localhost";
  $username = "username";
  $password = "password";
  $send_to = htmlspecialchars($_SERVER["PHP_SELF"]);
  // Create connection
  $mysql = new mysqli($servername, $username, $password);

  // Check connection
  if ($mysql->connect_error) {
      die("Connection failed: " . $mysql->connect_error);
  }

  if (!empty($_POST))
  {
    $user = test_input($_POST["username"]);
    $pass = test_input($_POST["password"]);
    $query = "SELECT * FROM yourTable WHERE user = '$uid' AND pass = '$pass''"
    $res = $mysql->query($query);
    if ($res->num_rows == 0)
    {
      $send_to = htmlspecialchars($_SERVER["PHP_SELF"]);
    }
    else
    {
      $send_to = "home.html";
    }
  }


  function test_input($data) 
  {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>

<div class="container">
  <div class="row">
    <div class="Absolute-Center is-Responsive">
      <div id="logo-container"><h3 class="text-center">LogiKK</h3></div>
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <form method="post" action="<?php echo $send_to; ?>" id="loginForm">
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
            <input class="form-control" type="text" name='username' placeholder="username"/>
          </div>
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
            <input class="form-control" type="password" name='password' placeholder="password"/>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"> I agree to the <a href="#">Terms of use</a>
            </label>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-default btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
