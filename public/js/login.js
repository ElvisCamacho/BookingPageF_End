// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBIk5W6x7NIgh-S4I2BOV4RgtayEUUyuj8",
  authDomain: "login-with-firebase-bd8a6.firebaseapp.com",
  projectId: "login-with-firebase-bd8a6",
  storageBucket: "login-with-firebase-bd8a6.appspot.com",
  messagingSenderId: "337859849712",
  appId: "1:337859849712:web:9a81f10d62555b144bc135",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert(
      "password must be between 7 to 15 characters which contain at least one numeric digit and a special character"
    );
    return;
    // Don't continue running the code
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      //alert('Bruger oprettet!!')
      window.location.replace("booking.html");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email eller Adgangskode matcher ikke!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      if (email == "camachocv@hotmail.com") {
        window.location.replace("me.html");
      } else {
        window.location.href = "booking.html";
      }

      //alert('Bruger logges ind!')
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

//fb auth
var provider = new firebase.auth.FacebookAuthProvider();

function facebookSignin() {
  firebase
    .auth()
    .signInWithPopup(provider)

    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token);
      console.log(user);
      window.location.replace("booking.html");
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
}
// Reset Password
const resetPassword = document.getElementById("resetPassword");
resetPassword.addEventListener("click", resetPasswordFunction);

const resetPasswordFunction = () => {
  email = document.getElementById("email").value;

  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Email sendt - Tjek din mail for reset password");
    })
    .catch((error) => {
      console.error(error);
    });
};

//logout

// function facebookSignOut() {
//   firebase
//     .auth()
//     .signOut()
//     .then(
//     //   function () {
//     //     console.log("Signed Out");
//     //   },
//     //   function (error) {
//     //     console.error("Sign Out Error", error);
//     //   }
//     //
//     );
// }

// const facebookSignOut = getAuth();signOut(auth).then(() => {  console.log("Facebook")}).catch((error) => {  console.log("Facebook Error")});

const logout = document.getElementById("logout");
logout.addEventListener("click", handleLogout);

function handleLogout(e) {
  e.preventDefault();
  console.log("signed out");
  // auth.signOut().then(() => {
  //   console.log("signed out");
  // });
}

// Validate Functions
function validate_email(email) {
  emailValidations = /^[^@]+@\w+(\.\w+)+\w$/;

  if (emailValidations.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

//To check a password between 7 to 15 characters which contain
//at least one numeric digit and a special character
function validate_password(password) {
  passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  if (passwordValidation.test(password) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

/////////////////////////////////////////////////////////
