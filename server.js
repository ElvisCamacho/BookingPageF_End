//import af express som giver voress app variabel adgang til
//at lave get, post requests osv.

const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

//brug a port 5000 i "dev mode" ellers venstre som er "envirmonent port" når applikationen er i produktion.
const PORT = process.env.PORT || 5000;

//giver os adgang til vores statiske sider i public folderen
app.use(express.static("public"));
app.use(express.json());

//get forespørgsel på vores html fil når vi besøger stien localhost:5000/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  //gør vi brug a nodemailer og opsætning af kontoen som dataen skal sendes til.

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "EMAIL",
      pass: "PASSWORD",
    },
  });

  /* const transporter = nodemailer.createTransport({
        host: 'Smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: 'cen@aelaw.com',
            pass: ''
        }
    }) */
  /* const mailconfirm = {
        from: 'no-reply@aelaw.com',
        to: req.body.email,
        subject: `Din booking: ${req.body.email}       Emne:  ${req.body.subject}`,
        text: `Dine indtastet oplysninger:\nNavn: ${req.body.name}\nEmail: ${req.body.email}\nTelefon: ${req.body.telephone}\nEmne: ${req.body.subject}\nDato: ${req.body.date} \nBesked: ${req.body.message}\n `

    } */

  const mailOptions = {
    from: "hanodihaha@gmail.com", // advokat firma's mail
    to: req.body.email,
    subject: `Booking fra: ${req.body.email}       Emne:  ${req.body.note}`,
   
    text: `Hey ${req.body.name}\n\nDu har en ny booking hos Advokatfirmaet Engelbrecht, d. 
    ${req.body.date}.\n\nIndtastet oplysninger:\n\nEmail: ${req.body.email}\nTelefon: 
    ${req.body.telephone}\nDato: ${req.body.date}\nBesked: 
    ${req.body.note}\n\nMed venlig hilsen\nAdvokatfirmaet Engelbrecht `,
  };

  //sendmail som logger error hvis error ellers email sendt med response tekst og "succes".
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log(`Email sent: ` + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
