<!DOCTYPE html>
<html>
<head>
  <?php
    session_start();
  ?>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
  <title>LogiKK</title>

  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <link href="../css/font.css" rel="stylesheet">

  <style media="screen">
  .myDark{
    background: #dcdcdc
  }

  .modal {
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    .modal:before {
      display: inline-block;
      vertical-align: middle;
      content: " ";
      height: 100%;
    }
  }

  .modal-dialog {
    display: inline-block;
    text-align: left;
    vertical-align: middle;
  }

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

  </style>
</head>

<body style="background: #e9e9e9">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">
      <!-- Logikk -->
      <img src="images/image-gallery/logikk.png" width="130" height="30">
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
          <a class="nav-link" href="pages/sandbox.html">Sandbox</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/challenges.html">Challenges </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/tutorial.html">Tutorial</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <?php if (!isset($_SESSION["username"])) : ?>
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
      <?php else : ?>
        <div class="dropdown">
         <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">Welcome
          <?php
              echo " " . $_SESSION['username'] . "<span class=\"caret\"></span></button>
              <ul class=\"dropdown-menu\">
              <li><a href=\"#\">Challenges</a></li>
              <li><a href=\"#\">Sandbox</a></li>
              <li><a href=\"php/signOut.php\">Sign Out</a></li>
              </ul>
              </div>";
            endif;
          ?>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->
  <a href="#home"></a>

  <!-- Carousel -->
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">

        <div class="carousel-item active">
          <a href="#head1"><img class="w-100" src="images/test1.png" alt="First slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head2"><img class="w-100" src="images/test2.png" alt="Second slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head3"><img class="w-100" src="images/test3.png" alt="Third slide"></a>
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

  <script src="plugins/jquery/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="plugins/bootstrap/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

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
        <form class="form-group" action="php/signUpEntry.php" method="post">
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
      <div class="modal-header">
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
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

    $(document).ready( function() {
      $("#sectionButton").hide(); //hide your div initially
      var topOfOthDiv = $("#carouselExampleControls").offset().top;
      $(window).scroll(function() {
        if($(window).scrollTop() > topOfOthDiv+250)
        {
          //scrolled past the other div?
          $("#sectionButton").show(); //reached the desired point -- show div
        } else {
          $("#sectionButton").hide();
        }
      });
    });

</script>

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
<script type="text/javascript">
  <?php
  if (isset($_SESSION['textSignUp'])) {
    echo 'alert("'.$_SESSION['textSignUp'].'");';
  }
  unset($_SESSION['textSignUp']);
  ?>
</script>

</body>

</html>
