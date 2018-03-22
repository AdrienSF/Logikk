<?php
  require_once("databaseDetails.php");
  if($error) exit;

  $query = "SELECT * FROM challenges";
  $result = $mysql->query($query);

  $i = -1;
  while($row = $result->fetch_array()) {
    $i++;

    $rows[$i]['id'] = $row['challenge_id'];
    $rows[$i]['name'] = $row['name'];
    $rows[$i]['text'] = $row['challenge_text'];
    // $rows[$i]['in'] = $row['in_num'];
    // $rows[$i]['and'] = $row['and_num'];
    // $rows[$i]['or'] = $row['or_num'];
    // $rows[$i]['xor'] = $row['xor_num'];
    // $rows[$i]['not'] = $row['not_num'];
    // $rows[$i]['truth'] = $row['truth_table'];
  }
?>

<script>
  // function to call is appendChild(id, name, desc)
  var arr = <?php echo json_encode($rows); ?>;
  for (var i=0; i < arr.length; i++)
  {
    var id   = arr[i]['id'];
    var name = arr[i]['name'];
    var text = arr[i]['text'];
    appendChallenge(id, name, text);
  }
</script>
