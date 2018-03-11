<!DOCTYPE html>
<html>
<head>
  <?php session_start(); ?>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>LogiKK</title>

  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">


  <style media="screen">
  .myDark{
    background: #dcdcdc
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

  .transitionRow {
    height: 8vh;
  }

  #toTop {
    height: 8vh;
  }

  </style>
</head>

<body style="background: #e9e9e9">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#"><span style="color: green"><b>Logikk</b></span></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="home.html">Home<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="pages/sandbox.html">Sandbox</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#head3">Tutorials</a>
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
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">

        <div class="carousel-item active">
          <a href="#head1"><img class="w-100" src="images/image-gallery/1.jpg" alt="First slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head2"><img class="w-100" src="images/image-gallery/2.jpg" alt="Second slide"></a>
        </div>

        <div class="carousel-item">
          <a href="#head3"><img class="w-100" src="images/image-gallery/3.jpg" alt="Third slide"></a>
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


  <div class="infocontainer" id="head1">
    <div class="container" >
      <div class="row justify-content-md-around">
        <div class="col-xs-12 col-lg-8">
          <h1>Logikk</h1>
          <p>
            Did it take you more time to understand this logic gate meme than it should've? There is one of three things that usually happens when someone encounters a logic gate meme such as this beautiful one: The person scrolls past calling it ridiculous and uninteresting, they stop and try to comprehend what the meme is about and forward it to one of their geeky friends in hopes of learning what it is about, or they understand it and have this unimaginable feeling of pride of knowing so much about Logic Gates. In the third situation more often than never people have this burning feeling of just popping an app open to design some logic gates, but sadly there aren't any available on the mainstream platform that satiates their hunger properly. We, at <b> Logikk </b>, decided to change it. With Logikk, misspelt incorrectly for reasons we would rather you learn by exploring our website a bit more, we aim to create a Logic gate simulator environment which is friendly for people of all ages. We aim to help students learn more about logic gates by giving them a platform where they can construct and evaluating logic gates to gain intuition on how they relate to truth tables. Each individual can either start as guests or login to keep track of their performance as it turns out Logikk is more than just a Logic Gate evaluation application. To be clear, it comes with two modes:

            <ol> <b>
              <li> Sandbox Mode </li>
              <li> Challenge Mode </li>
            </b> </ol>

          </p>
        </div>
        <div class="col-xs-12 col-lg-4">
          <p><img src="images/android_gate.jpg" width=130% height=280></p>
        </div>
      </div>
    </div>
  </div>

  <div class="infocontainer myDark" id="head2">
    <div class="container">
      <div class="row justify-content-md-around">
        <div class="col-xs-12 col-lg-4">
          <p>INSERT IMAGE HERE</p>
        </div>
        <div class="col-xs-12 col-lg-8">
          <h1>Sandbox</h1>
          <p>
            Sed vel magna ut ipsum posuere placerat. Integer nec accumsan velit. Sed tempus metus quis est dictum ultricies. Vestibulum tincidunt porta risus, ullamcorper consectetur felis feugiat dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur felis mauris, tristique sed pellentesque sit amet, suscipit in lectus. Pellentesque a purus at quam accumsan bibendum. Maecenas a turpis ut leo pulvinar efficitur. Praesent a mi at sapien aliquet dictum. In augue ligula, lobortis ut consectetur et, mattis at magna. Integer ac orci sed quam tempor commodo. Cras in venenatis felis. Praesent pellentesque metus sed odio fringilla mattis. Curabitur urna nulla, hendrerit et nulla a, vestibulum consequat arcu. Curabitur et odio quis est sagittis viverra.
          </p>
        </div>
      </div>
    </div>
  </div>


  <div class="infocontainer" id="head3">
    <div class="container">
      <div class="row justify-content-md-around">
        <div class="col-xs-12 col-lg-8">
          <h1>Challenges</h1>
          <p>
            Proin cursus orci sagittis pharetra venenatis. Cras imperdiet posuere massa. Pellentesque accumsan lobortis commodo. In in dui aliquam, interdum lacus at, pharetra orci. Nulla vulputate iaculis dapibus. Maecenas vehicula, nisi at congue hendrerit, risus metus congue sem, vitae pulvinar eros magna sed lorem. Vestibulum velit dui, finibus sit amet rhoncus sit amet, accumsan et justo. Nulla justo ante, tempus a nisi quis, dignissim ornare felis. Sed commodo vitae odio in porttitor. Sed accumsan scelerisque urna sit amet egestas. In a mi orci.
          </p>
        </div>
        <div class="col-xs-12 col-lg-4">
          <p>INSERT IMAGE HERE</p>
        </div>
      </div>
    </div>
  </div>

  <div class="infocontainer myDark" id="head4">
    <div class="container">
      <div class="row justify-content-md-around">
        <div class="col-xs-12 col-lg-4">
          <p>INSERT IMAGE HERE</p>
        </div>
        <div class="col-xs-12 col-lg-8">
          <h1>Tutorials</h1>
          <p>
            Aenean dapibus enim sed nisl venenatis, eget molestie lorem convallis. Nunc non orci ornare, maximus libero ut, iaculis felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam sit amet rutrum mi. Nam dignissim dictum magna, vitae dapibus odio laoreet vel. Sed pharetra convallis elit sit amet sagittis. Nam vitae urna volutpat, laoreet ex at, fringilla nisl.
          </p>
        </div>
      </div>
    </div>
  </div>



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
        <form class="form-group" action="../home.php" method="post">
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
        <form class="form-group" action="../home.php" method="post">
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
</body>

</html>
