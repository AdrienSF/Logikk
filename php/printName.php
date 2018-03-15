<?php
if (isset($_SESSION["username"])) {
  $userForPrint = $_SESSION['username'];
  $query = "SELECT * FROM user_info WHERE
  Username='$userForPrint'";
  $result = $mysql->query($query);
  $row = $result->fetch_assoc();
  $nameForPrint = $row['Name'];
}
?>
