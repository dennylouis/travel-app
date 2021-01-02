const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(user) {
  const { email, firstName } = user;
  const emailResult = await sgMail.send({
    to: email,
    from: "denny@dennylouis.com",
    subject: `Welcome ${firstName}, thanks for joining ...`,
    text: "Let's confirm your email address and get started",
    // body of the email needs to contain a link to go to the website
    // and call the update the "confirm email" api endpoint
    html: `<strong>Let's confirm your email address and get started</strong>
    <p>${JSON.stringify(user, null, 2)}</p>`,
  });

  console.log(emailResult, "email sent");

  return emailResult;
}

export { sgMail, sendConfirmationEmail };
