<!DOCTYPE html>
<head>
<?php
  if(isset($_SESSION["username"]))
  {
    $_SESSION["username"] = null;
  }
  echo "<meta http-equiv=\"refresh\" content=\"0;url=pages/signIn.php\"/>";
?>
</head>
