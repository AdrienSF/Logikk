<?php
  require_once("databaseDetails.php");
  if($error) exit;

  $query = "SELECT * FROM challenges WHERE id=\"" . $_GET['id'] . "\"";
  $result = $mysql->query($query);
  $row = $result->fetch_assoc();

  if($row) {
    // works
  } else {
    // broken
  }
?>

<script>
  var obj = {};

  obj.name = "<?php echo $row['name']; ?>";
  obj.description = "<?php echo $row['description']; ?>";
  obj.win_text = "<?php echo $row['win_text']; ?>";

  obj.in  = <?php echo $row['in']; ?>;
  obj.and = <?php echo $row['and']; ?>;
  obj.or = <?php echo $row['or']; ?>;
  obj.xor = <?php echo $row['xor']; ?>;
  obj.not = <?php echo $row['not']; ?>;
  obj.truth_table = "<?php echo $row['truth_table']; ?>";

  loadChallenge(obj);
</script>
