// import axios, { response, error } from "../../node_modules/axios/index";

//const { default: axios } = require("axios");

// GET ALL FROM DB USING WEB API CAR *********************************

let ContentElement = document.getElementById("carsContent");

let getAll = document.getElementById("getAllButton");
getAll.addEventListener("click", getAllButton);

//   const BASE_URL = "https://localhost:44342";
function getAllButton() {
  axios
    .get("https://localhost:44342/api/booking")
    .then(function (response) {
      // console.log(response);
      // console.log("are in then");
      // console.log(response);

      let result = "<ol>";
      //remove all the li elements one by one
      while (ContentElement.firstChild) {
        ContentElement.removeChild(ContentElement.lastChild);
      }
      response.data.forEach((Booking, index) => {
        // console.log(Booking);
        let newNode = AddLiElement(
          Booking.name +
            " " +
            Booking.telephone +
            " " +
            Booking.email +
            " " +
            Booking.note +
            " " +
            Booking.date
        );
        //console.log(newNode);
        ContentElement.appendChild(newNode);
        //console.log("newNode");

        result +=
          "<li>" +
          Booking.name +
          " " +
          Booking.telephone +
          " " +
          Booking.email +
          " " +
          Booking.note +
          " " +
          Booking.date +
          "</li>";
      });
      result += "</ol>";

      ContentElement.innerHTML = result;
    })
    .catch(function (error) {
      ContentElement.innerHTML = generateErrorHTMLOutput(error);

      // console.log("Error in the typescript code");
      //console.log(error);
    });

  console.log("At the end in the showAll - Booking");
}

// ******************  search by Tel ***********************

document.getElementById("getTelephone").addEventListener("click", search);

function search() {
  let input = document.getElementById("searchImput");
  let inputText = input.value;
  // let convertint = parseInt(inputText);

  let Book = document.getElementById("carIdResult");

  axios
    .get("https://localhost:44342/api/booking/telephone/" + inputText)
    .then(function (response) {
      console.log(response.data[0].name);

      Book.innerHTML =
        " Name: " +
        response.data[0].name +
        "  Telephone: " +
        response.data[0].telephone +
        "  Email: " +
        response.data[0].email +
        "  Notes: " +
        response.data[0].note;

      // let newNode = AddLiElement(
      //   "ID: " +
      //     car.id +
      //     ", " +
      //     car.model +
      //     ", " +
      //     car.vendor +
      //     ", " +
      //     car.price
      // );
      // Book.appendChild(newNode);
    })
    .catch(function (error) {
      Book.innerHTML = "kan ikke finde clienten";
    });

  console.log("done");
}

// ******************  Delete by Tel ***********************

document
  .getElementById("deleteButton")
  .addEventListener("click", deleteTelephone);

function deleteTelephone() {
  let tele = document.getElementById("deleteCarId").value;

  axios
    .delete("https://localhost:44342/api/booking/" + tele)
    .then((response) => {
      // this only runs on success
      console.log("RESPONSE FROM POST" + response.data);
      alert("Tele" + tele + " is deleted ");
    })
    .catch(function (error) {
      console.log("Error While Posting Data", error);
    });
}

//********************* Helper method to make a list ************************/

function AddLiElement(text) {
  let newLi = document.createElement("li");
  let newTextNode = document.createTextNode(text);
  newLi.appendChild(newTextNode);
  //list.appendChild(newLi);
  return newLi;
}

function generateErrorHTMLOutput(response) {
  // here is the putput we want to display on o the page
  return "<h4>Error: der er ingen Booking i system. Tak</h4>";
}

document.getElementById("clear").addEventListener("click", clearOutput);

function clearOutput() {
  var resultElement = document.getElementById("carsContent");
  resultElement.innerHTML = "";
  //var resultElement = document.getElementById("postResult");
  // resultElement.innerHTML = "";
  // var resultElement = document.getElementById("postResult");
  // resultElement.innerHTML = "";
}
