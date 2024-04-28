import sendGrid from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY;

sendGrid.setApiKey(API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "qwertyu1248test@gmail.com" };
  await sendGrid.send(email);

  return true;
};

export default sendEmail;
