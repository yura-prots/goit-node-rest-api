import sendGrid from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY;

sendGrid.setApiKey(API_KEY);

const testEmail = {
  to: "ginelig835@funvane.com",
  from: "qwertyu1248test@gmail.com",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

const sgMmail = sendGrid
  .send(testEmail)
  .then(() => console.log("email send success"))
  .catch((error) => console.log(error.message));

export default sgMmail;

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
