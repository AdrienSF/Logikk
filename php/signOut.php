<!DOCTYPE html>
<head>
  <?php
    session_start();
    session_unset();
    session_destroy();
  ?>
  <meta http-equiv="refresh" content="2;url=../home.php"/>
</head>
<body>
  <div class="loader">
    Please wait...
  </div>
</body>
