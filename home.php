<!DOCTYPE html>
<html>
<head>
  <?php session_start(); ?>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>LogiKK</title>

  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="plugins\bootstrap\css\bootstrap.min.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

  <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
  <script src="plugins\bootstrap\js\bootstrap.min.js"></script>

  <link href="../css/font.css" rel="stylesheet">

  <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">

  <script src="plugins/jquery/jquery.min.js"></script>
  <script src="plugins\jquery\jquery.min.js"></script>

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
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="home.php">Home<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/sandbox.php">Sandbox</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/challengeLibrary.php">Challenges </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/tutorial.html">Tutorial</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <?php if (!isset($_SESSION["username"])) { ?>
        <li class="nav-item">
          <button class="btn btn-primary-outline" type="button" data-toggle="modal" data-target="#signInModal">
          <i class="fas fa-sign-in-alt"></i> Sign In
          </button>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary-outline" style="margin-left: 0.5vw" type="button" data-toggle="modal" data-target="#signUpModal">
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
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  <!-- Carousel End -->

  <!-- SignUp Modal -->
  <div class="modal fade" id="signUpModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="align:center;">
          <h3 class="modal-title">Sign Up</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form class="form-group" id="signUpForm" action="php/signUpEntry.php" method="post">
        <div class="col-*-12" id="wrapperContents">
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="fas fa-user"></i></span>
            <input class="form-control" type="text" name='name' placeholder="Name" required/>
          </div>
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="fas fa-user-circle"></i></span>
            <input class="form-control" type="text" name='username' placeholder="Username" required/>
          </div>
          <div class="form-group input-group">
            <span class="input-group-addon"><i class="fas fa-envelope"></i></span>
            <input class="form-control" type="email" name='email' placeholder="Email" required/>
          </div>
          <fieldset>
            <div class="form-group input-group">
              <span class="input-group-addon"><i class="fas fa-lock"></i></span>
              <input class="form-control" type="password" name='password' id="password" placeholder="Password" required/>
            </div>
            <div class="form-group input-group">
              <span class="input-group-addon"><i class="fas fa-lock"></i></span>
              <input class="form-control" type="password" name='confirmedPassword' id="confirm_password" placeholder="Retype Password" oninput="check(this);" required/>
            </div>
          </fieldset>
          <div class="checkbox">
            <label>
              <input type="checkbox" required> I agree to the <a href="#">Terms of use</a>
            </label>
          </div>
        </div>

        </div>
        <div class="modal-footer">
        <div class="container-fluid">
          <div class="form-group">
            <button type="submit" class="btn btn-dark btn-block">Create account</button>
          </div>
        </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- SignIn Modal -->
  <div class="modal fade" id="signInModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" style="align:center;">
        <h3 class="modal-title">Sign In</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container">
          <form class="form-group" action="php/signInVerify.php" method="post">
            <div class="col-*-8" id="wrapperContents">
              <div class="form-group input-group">
                <span class="input-group-addon"><i class="fas fa-user-circle"></i></span>
                <input class="form-control" type="text" name='username' placeholder="Username" required/>
              </div>
              <div class="form-group input-group">
                <span class="input-group-addon"><i class="fas fa-lock"></i></span>
                <input class="form-control" type="password" name='password'placeholder="Password" required/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container-fluid">
              <div class="form-group">
                <button type="submit" class="btn btn-dark btn-block">Sign In</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

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
