<!DOCTYPE html>
<head>
<?php
  if(isset($_COOKIE["username"]))
  {
    $cookie_user = $_COOKIE["username"];
    setcookie("username",$cookie_user,time()-1);
  }
  echo "<meta http-equiv=\"refresh\" content=\"0;url=index.php\"/>";
?>
</head>
