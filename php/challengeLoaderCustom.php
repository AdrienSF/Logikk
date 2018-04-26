<?php
  $data = $_POST['data'];
?>

<script>
  var data = <?php echo json_encode($data) ?>;
  loadChallenge(JSON.parse(data));
</script>
