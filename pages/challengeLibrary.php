<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" type="image/ico" href="../favicon.ico"/>
  <title>LogiKK</title>


    <!-- Bootstrap CSS CDN -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="../plugins/bootstrap/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">

    <link href="../css/style_implement.css" rel="stylesheet">
    <link href="../css/challenges.css" rel="stylesheet">

    <link href="../css/font.css" rel="stylesheet">

</head>

<body style="background: #e9e9e9">


  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="nav-link" href="../home.php">
      <img src="../images/logikk.png" width="130" height="30">
      </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="../home.php">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="sandbox.php">Sandbox </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="challengeLibrary.php">Challenges <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="tutorial.html">Tutorial</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-primary-outline" type="button" data-toggle="modal" data-target="#signInModal">
          <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->

  <div id="loadChallengeModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Load a custom challenge</h4>
        </div>
        <div class="modal-body">

          <p>Paste challenge code:</p>
          <textarea type="text" width="100%" rows="3" id="challengeCode"></textarea><br>
          <button class="btn btn-dark" onclick="loadChallengeBtnClicked()" data-dismiss="modal" type="button">Load</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>


  <!-- challenges -->
  <section>
    <div class="container-fluid">

      <div class="block-header">
        <div class="row clearfix">
          <div class="col-lg-1 col-sm col">
            <h2>SANDBOX</h2>
          </div>
          <div class="col-lg-11 col-sm col" align="right">
            <button class="btn btn-dark" data-toggle="modal" data-target="#loadChallengeModal" onclick="" type="button">Load custom challenge</button>
          </div>
        </div>
      </div>

      <div class="row clearfix" id="challengeCards"></div>
    </div>
  </section>


  <script src="../js/challenges.js"></script>
  <script src="../js/challengeTranscriber.js"></script>
  <?php include('../php/challengeCardInfo.php') ?>

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>
