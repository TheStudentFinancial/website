<!DOCTYPE html>
<html>
  <head>
    <!-- Dit is nodig voor de firebase moet in elke header van elke -->
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-functions.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-auth.js"></script>


    <link rel="stylesheet" text="lang/css" href="style.css">
    <!-- Google Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="navbar.js"></script>
    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Rokkitt:wght@500;600&display=swap" rel="stylesheet">
    <!-- Font Awesome 5 -->
    <script src="https://kit.fontawesome.com/6d88c2ba6f.js" crossorigin="anonymous"></script>
    <title>Contact | The Student Financial</title>
  </head>
  <body>
    <?php
    $name = $email = $message "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $name = test_input($_POST["fname"]);
      $email = test_input($_POST["emailaddress"]);
      $message = test_input($_POST["message"]);
    }

    function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      mail("julian.ma@live.nl", "Contact form submission", $message);
    }
    ?>
    <!-- Burger dropdown -->
    <div class="burger-dropdown">
      <a class="navbrand navlink burgerfotocontainer" href="#"><img class="brandfoto burgerfoto" src="logo.png" alt="Logo"></a>
      <button class="burger-close" type="button" name="button"><i class="material-icons">close</i></button>
      <ul class="burgerlist">
        <li><a class="navlink" href="blog.html">Blog</a></li>
        <li><a class="navlink" href="aboutus.html">About&nbsp;us</a></li>
        <li><a class="navlink" href="contact.html">Contact</a></li>
        <li><hr class="navhr" /></li>
        <li><a class="navlink" href="login.html">Log&nbsp;in</a></li>
        <li><a class="navlink" href="signup.html">Sign&nbsp;up</a></li>
        <li><a class="navlink navlogout" href="#">Log&nbsp;out</a></li>
      </ul>
    </div>

    <div class="container">

      <!-- Navigation bar -->
      <nav class="navbar">
        <a class="navbrand navlink" href="#"><img class="brandfoto" src="logo.png" alt="Logo"></a>
        <ul class="navlist navinitial">
          <li><a class="navlink" href="blog.html">Blog</a></li>
          <li><a class="navlink" href="aboutus.html">About&nbsp;us</a></li>
          <li><a class="navlink" href="contact.html">Contact</a></li>
          <li><a class="navlink logged-out" style="display: none;" href="login.html">Log&nbsp;in</a></li>
          <li><a class="navlink logged-out" style="display: none;"href="signup.html">Sign&nbsp;up</a></li>
          <li><a class="navlink navlogout logged-in" style="display: none;" id="logout">Log&nbsp;out</a></li>
        </ul>
        <button class="burgermenu" type="button" name="button"><i class="material-icons">menu</i></button>
      </nav>
      <nav class="burger-dropdown">
        <a class="navbrand navlink" href="#"><img class="brandfoto" src="logo.png" alt="Logo"></a>
        <ul class="navlist navinitial">
          <li><a class="navlink" href="blog.html">Blog</a></li>
          <li><a class="navlink" href="aboutus.html">About&nbsp;us</a></li>
          <li><a class="navlink" href="contact.html">Contact</a></li>
          <li><a class="navlink" href="login.html">Log&nbsp;in</a></li>
          <li><a class="navlink" href="signup.html">Sign&nbsp;up</a></li>
          <li><a class="navlink navlogout" href="#">Log&nbsp;out</a></li>
        </ul>
      </nav>

      <!-- Page content -->
      <div class="page-content contact-content">

        <div class="contact-main">
          <h1 class="contact-header">Contact our Support and Editorial team.</h1>
          <p class="contact-description">
            Do you have any questions, complaints or suggestions or would you like to publish your article with us? We're all ears!<br />
            Use the contact form to your right or <a class="contact-email" href="mailto:hello@thestudentfinancial.com">e-mail&nbsp;us</a>.
          </p>
        </div>
        <div class="contact-form-container">
          <form class="contact-form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
            <h3 class="contact-form-header">Leave us a message</h3>
            <input class="contact-input" type="text" name="fname" placeholder="Full Name"><br />
            <input class="contact-input" type="email" name="emailaddress" placeholder="Email Address"><br />
            <textarea class="contact-textarea" name="message" rows="12" cols="35" placeholder="Message"></textarea><br />
            <input class="contact-submit" type="submit" name="submit" value="Submit"><br />
          </form>
        </div>


      <!-- End of Page Content -->
      </div>

      <!-- Footer -->
      <footer>
        <h4 class="footer-header">The Student Financial</h4>
        <div class="footer-socials">
          <a class="instaref" href="#">
            <h6 class="social-header">Follow us on Instagram!</h6>
            <i class="fab fa-instagram"></i>
          </a>
        </div>
        <div class="footer-useful">
          <div class="footer-links">
            <ul class="fuseful">
              <li class="footerlink"><a class="footerref" href="#">Sitemap</a></li>
              <li class="footerlink"><a class="footerref" href="blog.html">Blog</a></li>
            </ul>
            <ul class="fuseful">
              <li class="footerlink"><a class="footerref" href="aboutus.html">About&nbsp;Us</a></li>
              <li class="footerlink"><a class="footerref" href="contact.html">Contact</a></li>
            </ul>
            <ul class="fuseful">
              <li class="footerlink"><a class="footerref" href="login.html">Log&nbsp;in</a></li>
              <li class="footerlink"><a class="footerref" href="signup.html">Sign&nbsp;up</a></li>
            </ul>
          </div>
          <small class="footer-copyright">Copyright &copy; <span id="copyright-year"></span> The Student Financial. All Rights Reserved.</small>
        </div>

      </footer>

    </div>

    <!-- Form validation -->
    <script language=”JavaScript”>
    var frmvalidator = new Validator(“contactform”);
    frmvalidator.addValidation(“name”,”req”,”Please provide your name”);
    frmvalidator.addValidation(“email”,”req”,”Please provide your email”);
    frmvalidator.addValidation(“email”,”email”, “Please enter a valid email address”);
</script>

    <!-- Dit is nodig voor voor firebase graag onder elke pagina plakken!! -->

    <!-- TODO: Add SDKs for Firebase products that you want to use
         https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script>

    <script>
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyAWKSoPggkI_lgNzNrxhLsJJBuQmUIUDls",
        authDomain: "the-student-financial.firebaseapp.com",
        databaseURL: "https://the-student-financial.firebaseio.com",
        projectId: "the-student-financial",
        storageBucket: "the-student-financial.appspot.com",
        messagingSenderId: "649671283940",
        appId: "1:649671283940:web:aa48521daab99f63b548f1",
        measurementId: "G-45YWJ73LS8"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

      const db = firebase.firestore()
      const auth =  firebase.auth()
      const functions = firebase.functions()
    </script>
    <script src="js/UserInterface.js"></script>

  </body>
</html>
