<?php
$user = $_COOKIE['username'];
$query = "SELECT * FROM user_info WHERE
Username='$user'";
$result = $mysql->query($query);
$row = $result->fetch_assoc();
echo $row["Name"];
$email = $row["Email"];
?>
