<!DOCTYPE html>
<html>
<head>
  <?php session_start(); ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" type="image/ico" href="../favicon.ico"/>
  <title>LogiKK</title>

  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

  <link href="../css/style_implement.css" rel="stylesheet">
  <link href="../css/sandbox.css" rel="stylesheet">
  <link href="../css/truthTable.css" rel="stylesheet">

  <link href="../css/font.css" rel="stylesheet">

  <style media="screen">
  #dark{
    background: #dcdcdc
  }
  </style>
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
          <a class="nav-link" href="sandbox.php">Sandbox</a>
        </li>
        <li class="nav-item active">
          <?php if (isset($_SESSION["username"])): ?>
            <a class="nav-link" href="challengeLibrary.php" id="challengesNav">Challenges</a>
          <?php else: ?>
            <a class="nav-link" id="challengesNav" onclick="alert('Please sign in to continue to Challenges');" style="cursor: pointer">Challenges</a>
          <?php endif; ?>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="tutorial.html">Tutorial</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <?php if (isset($_SESSION["username"])) { ?>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user"></i> Welcome <?php echo $_SESSION["username"];?>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <a class="dropdown-item" href="../php/signOut.php">Sign Out</a>
            </div>
          </div>

        <?php } else {?>
        <!-- Sign In button -->
        <li class="nav-item">
          <button class="btn btn-primary-outline" type="button" onclick="alert('Please go to hompepage to sign in.');"style="margin: 0.5vw 0.2vw" id="signInButton">
          <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
        </li>
        <?php } ?>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->


  <!-- Sandbox -->
  <section>
    <div class="container-fluid">

      <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="card">
            <p></p>
            <h3 class="text-center" id=challengeHeader><!--title loaded from js--></h3>
            <p class="text-center" id=challengeDescription><!--description loaded from js--></p>
            <br>
            <h5 class="text-center">Restrictions</h5>
            <p class="text-center">
              You must use <b id="goalInputs"></b> inputs and no more than
              <ul class="text-center" id="restrictions">

              </ul>
            </p>
          </div>
        </div>
      </div>
      <div class="block-header">
        <div class="row clearfix">
          <div class="col-lg-offset-8 col-lg-12" align="right">
            <button class="btn btn-dark" onclick="makeGate('IN')"    type="button" id="inputButton" title="give me more">New Input</button>
            <button class="btn btn-dark" onclick="makeGate('AND')"   type="button" id="andButton">AND</button>
            <button class="btn btn-dark" onclick="makeGate('OR')"    type="button" id="orButton">OR</button>
            <button class="btn btn-dark" onclick="makeGate('XOR')"   type="button" id="xorButton">XOR</button>
            <button class="btn btn-dark" onclick="makeGate('NOT')"   type="button" id="notButton">NOT</button>
          </div>
          <div class="col-lg-1 col-sm col">
            <h2>CHALLENGE</h2>
          </div>
          <div class="col-lg-8 col-sm col" align="float-none">
            <h3 id="boolExp" class="text-center">some expression</h3>
          </div>
          <div class="col-lg-3 col-sm col" align="right">
            <button class="btn btn-dark" onclick="clearAll()"        type="button" title="remove all gates">Clear All</button>
            <button class="btn btn-dark" onclick="checkChallengeComplete(true)" type="button" id="submitButton" title="challenge is incomplete">Submit</button>

          </div>
        </div>
      </div>

      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-body">
              <p id="winMessage"></p>
            </div>
            <div class="modal-footer">
                <a href="challengeLibrary.php"><button type="button" class="btn btn-default">Go to Challenge List</button></a>
                <!-- <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div> -->
                <button type="button" class="btn btn-default" data-dismiss="modal">Stay on Page</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row clearfix">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
          <div class="card canvascard" id="canvasCard">
            <svg id="svgcanvas" width="100%" height="100%">
              <defs> <!-- arrow head definition -->
                <marker id="arrowblack" markerWidth="10" markerHeight="10" refX="8" refY="2" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,4 L9,2 z" fill="#000000" />
                </marker>
                <marker id="arrowred" markerWidth="10" markerHeight="10" refX="8" refY="2" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,4 L9,2 z" fill="#f00" />
                </marker>
              </defs>
            </svg>

            <section id="canvas" height="0px">
               <!-- stuff is added here by sandbox.js, script loaded at end of files-->
            </section>
          </div>
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <div class="card" id="ttCard">
            <div class="container-fluid">
              <table class="table-bordered table-hover" id="truthtable">
                <thead> <tr id="TThead"> </tr> </thead>
                <tbody id="TTbody"> </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script src="../js/gates.js"></script>
  <script src="../js/gatesetup.js"></script>
  <script src="../js/graphics.js"></script>
  <script src="../js/truthtable.js"></script>
  <script src="../js/sandbox.js"></script>

  <script src="../js/challengeTranscriber.js"></script>
  <?php include('../php/challengeInfo.php') ?>
  <script src="../js/challenge.js"></script>
  <!-- Challenge End -->

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>
