<!DOCTYPE html>
<head>
  <?php
    session_start();
    if(isset($_SESSION["username"]))
    {
      $_SESSION["username"] = null;
    }
    echo "<meta http-equiv=\"refresh\" content=\"0;url=home.html\"/>";
  ?>
</head>
