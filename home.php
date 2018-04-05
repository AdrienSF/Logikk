<!DOCTYPE html>
<html>
<head>
  <?php session_start(); ?>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>LogiKK</title>

<<<<<<< HEAD
  <script src="plugins/jquery/jquery.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

  <!-- Bootstrap CSS CDN -->
  <link href="plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
=======
  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

  <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
>>>>>>> removed \ links

  <!-- Bootstrap javascript CDN -->
  <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
  
  <link href="../css/font.css" rel="stylesheet">

  <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">

<<<<<<< HEAD
=======
  <script src="plugins/jquery/jquery.min.js"></script>
>>>>>>> removed \ links

  <style media="screen">
    .myDark{ background: #dcdcdc }
    .form-group span {
        margin: auto;
        padding-right: 5px;
      }
    h1 {
      text-align: center !important;
    }

    .infocontainer {
      min-height: 100vh;
      padding-top: 8vh;
    }

    .transitionRow { height: 8vh; }

    #toTop { height: 8vh }

    .vertical-center {
    min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
    min-height: 100vh; /* These two lines are counted as one :-)       */

    display: flex;
    align-items: center;
    }

    .body {
      background-image: ../images/stuff_for_carousel_slide_2/GRID.xcf.;
    }

  </style>
</head>

<body style="background: #e9e9e9">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="nav-link" href="home.php">
      <img src="images/logikk.png" width="130" height="30">
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Navigation options -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="home.php">Home<span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="pages/sandbox.php">Sandbox</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="pages/challengeLibrary.php">Challenges</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="pages/tutorial.html">Tutorial</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <?php if (!isset($_SESSION["username"])) { ?>
        <!-- Sign In button -->
        <li class="nav-item">
          <a href="pages/signIn.php">
            <button class="btn btn-primary-outline" type="button">
            <i class="fas fa-sign-in-alt"></i> Sign In
            </button>
          </a>
        </li>
        <!-- Sign Up button  -->
        <li class="nav-item">
          <button class="btn btn-primary-outline" style="margin-left: 4px" >
          <i class="fas fa-user-plus"></i> Sign Up
          </button>
        </li>

        <?php } else {
          echo "<li class=\"nav-item\">";
          echo "<a class=\"nav-link\" href=\"pages/signIn.html\"><i class=\"fas fa-user\"></i> Welcome ";
          echo $_SESSION["username"] . "</li></a>";
        }
        ?>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->
  <a href="#home"></a>

  <!-- Carousel -->
    <div id="carouselExampleControls" class="carousel slide vertical-center" data-ride="carousel">

      <div class="carousel-inner">

        <div class="carousel-item active">
          <a href="#head1"><img class="w-100" src="images/FINAL1.png" alt="First slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head2"><img class="w-100" src="images/FINAL2.png" alt="Second slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head3"><img class="w-100" src="images/FINAL3.png" alt="Third slide"></a>
        </div>

      </div>

      <a class="left carousel-control" href="#carouselExampleControls" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only"> Previous </span>
      </a>
      <a class="right carousel-control" href="#carouselExampleControls" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only"> Next </span>
      </a>
    </div>
  <!-- Carousel End -->

  <script type="text/javascript">
    function check(input) {
          if (input.value != document.getElementById('password').value) {
              input.setCustomValidity('Password Must be Matching.');
          } else {
              // input is valid -- reset the error message
              input.setCustomValidity('');
          }
      }
  </script>

</body>

</html>
