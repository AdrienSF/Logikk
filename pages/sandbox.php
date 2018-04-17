<!DOCTYPE html>
<html>
<head>
  <?php session_start(); ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" type="image/ico" href="../favicon.ico"/>
  <title>LogiKK</title>

  <!-- Jquery -->
  <script src="../plugins/jquery/jquery.min.js"></script>

  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="../plugins/bootstrap/css/bootstrap.min.css">

  <!-- Bootstrap JS CDN -->
  <script src="../plugins/bootstrap/js/bootstrap.min.js"></script>

  <!-- Bootstrap javascript CDN -->
  <script src="../plugins/bootstrap/js/bootstrap.min.js"></script>

  <link href="../css/font.css" rel="stylesheet">

  <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">

  <link href="../css/style_implement.css" rel="stylesheet">
  <link href="../css/sandbox.css" rel="stylesheet">
  <link href="../css/truthTable.css" rel="stylesheet">

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
        <li class="nav-item active">
          <a class="nav-link" href="sandbox.php">Sandbox <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="challengeLibrary.php">Challenges </a>
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
              <a class="dropdown-item" href="challenges.html">Challenges</a>
              <a class="dropdown-item" href="../php/signOut.php">Sign Out</a>
              <baclass="dropdown-item" href="">Something else here</a>
            </div>
          </div>

        <?php } ?>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->

  <p style="display: none" id="holder"></p>
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Save and Load Circuits</h4>
        </div>
        <div class="modal-body">
          <p>This circuit's code:</p>
          <textarea type="text" readonly="true" width="100%" rows="3" id="saveCircuitText"></textarea>

          <br><br>

          <p>Load Circuit:</p>
          <textarea type="text" width="100%" rows="3" id="loadCircuitText"></textarea><br>
          <!-- these functions are in circuitTranscriber -->
          <button class="btn btn-dark" onclick="loadBtnClicked()" data-dismiss="modal" type="button">Load</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>
  <div id="createChallengeModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create a challenge from this circuit</h4>
        </div>
        <div class="modal-body">
          <p>This circuit's challenge code:</p>
          <textarea type="text" readonly="true" width="100%" rows="3" id="challengeCode"></textarea>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>

  <!-- Sandbox -->
  <section>
    <div class="container-fluid">
      <div class="block-header">
        <div class="row clearfix">
          <div class="col-lg-offset-8 col-lg-12" align="right">
            <button class="btn btn-dark" onclick="makeGate('IN')"    type="button" id="inputButton">New Input</button>
            <button class="btn btn-dark" onclick="makeGate('AND')"   type="button">AND</button>
            <button class="btn btn-dark" onclick="makeGate('OR')"    type="button">OR</button>
            <button class="btn btn-dark" onclick="makeGate('XOR')"   type="button">XOR</button>
            <button class="btn btn-dark" onclick="makeGate('NOT')"   type="button">NOT</button>
          </div>
          <div class="col-lg-1 col-sm col">
            <h2>SANDBOX</h2>
          </div>
          <div class="col-lg-8 col-sm col" align="float-none">
            <h3 id="boolExp" class="text-center">some expression</h3>
          </div>
          <div class="col-lg-3 col-sm col" align="right">
            <button class="btn btn-dark" onclick="clearAll()"        type="button">Clear All</button>
            <button class="btn btn-dark" data-toggle="modal" data-target="#myModal" onclick="saveLoadBtnClicked()" type="button">Save/Load</button>
            <button class="btn btn-dark" data-toggle="modal" data-target="#createChallengeModal" onclick="makeChallengeBtnClicked()" type="button">Create challenge</button>
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

  <script src="../js/circuitTranscriber.js"></script>
  <script src="../js/challengeTranscriber.js"></script>
  <script src="../js/sandbox.js"></script>
  <!-- Sandbox End -->

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>
