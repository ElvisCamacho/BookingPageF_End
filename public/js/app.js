//frontend
const contactForm = document.querySelector(".contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let date = document.getElementById("date");
let note = document.getElementById("note");
let telephone = document.getElementById("telephone");

//preventDefault sørger for at siden ikke opdatere sig selv efter submit er trykket.
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //variabel med objekter som bliver tastet ind
  let formData = {
    name: name.value,
    email: email.value,
    telephone: telephone.value,
    //subject: subject.value,
    date: date.value,
    note: note.value,
  };

  //poster vores vores variabel i json format.
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");

  //init af function() når vi modtager et svar fra server.js som er "succes" og rydder felterne.
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      name.value = "";
      email.value = "";
      telephone.value = "";
      //subject.value = '';
      date.value = "";
      note.value = "";
      window.location.href = "thankyou.html";
    } else {
      alert("Noget gik galt");
    }
  };

  xhr.send(JSON.stringify(formData));

  console.log("Creating");

  let url = "https://localhost:44342/api/booking/";

  axios
    .post(url, formData)

    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("done");
});
