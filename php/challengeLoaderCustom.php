<?php
  $data = $_POST['data'];
  echo json_encode($data);
?>

<script>
  var data = <?php echo json_encode($data) ?>;
  loadChallenge(JSON.parse(data));
</script>
