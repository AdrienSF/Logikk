<!DOCTYPE html>
<head>
  <?php
    session_start();
    session_unset();
    session_destroy();
  ?>
  <meta http-equiv="refresh" content="2;url=../home.php"/>
  <style media="screen">
  .loader {
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
  </style>
</head>
<body>
  <div class="container-fluid">
    <div class="loader">
    </div>
    Please Wait...
  </div>
</body>
