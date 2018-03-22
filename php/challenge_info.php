<?php
require_once("databaseDetails.php");
if($error) exit;

  // $userForPrint = $_SESSION['username'];
  $query = "SELECT * FROM challenges WHERE Challenge_id=challengeID";
  $result = $mysql->query($query);
  $row = $result->fetch_assoc();
  $id = $row['challenge_id'];
  $name = $row['name'];
  $text = $row['challenge_text'];
  $in_num = $row['in'];
  $and_num = $row['and'];
  $or_num = $row['or'];
  $xor_num = $row['xor'];
  $not_num = $row['not'];
  echo 'Challenge ID: '.$id.'<br>';
  echo 'Name: '.$name.'<br>';
  echo 'Description Text: '.$text.'<br>';
?>

<script>
  nameOfTheChallenge = "<?php echo $name ?>";
  goalInputs = "<?php echo $in_num ?>";
  maxANDgates = "<?php echo $and_num ?>";
  maxORgates = "<?php echo $or_num ?>";
  maxXORgates = "<?php echo $xor_num ?>";
  maxNOTgates = "<?php echo $not_num ?>";
</script>
