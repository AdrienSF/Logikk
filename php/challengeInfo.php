<?php
  require_once("databaseDetails.php");
  if($error) exit;

  if($_POST['data']) {
    include 'challengeLoaderCustom.php';
  } else {
    include 'challengeLoaderDatabase.php';
  }
?>
