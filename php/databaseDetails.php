<?php
// database connection details
  $servername = "dbhost.cs.man.ac.uk";
  $db_username = "a54832bs";
  $db_password = "jSgsSnTMF96ceUKm";
  $db_name="2017_comp10120_m4";

  // Create connection
  $mysql = new mysqli($servername, $db_username, $db_password, $db_name);
  $error = false;
  // Check connection
  if ($mysql->connect_error) {
      die("Connection failed: " . $mysql->connect_error);
      $error = true;
  }
?>
