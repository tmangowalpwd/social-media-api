const nodemailer = require("nodemailer")

const mailer = async ({
  subject,
  to,
  text,
  html
}) => {
  // const testAccount = await nodemailer.createTestAccount()
  const transport = nodemailer.createTransport({
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
      // user: testAccount.user,
      // pass: testAccount.pass
    },
    host: "smtp.gmail.com",
    // host: "smtp.etheral.email",
  })

  await transport.sendMail({
    subject: subject || "Test Subject",
    to: to || "thedevmango@gmail.com",
    text: text || "Test nodemailer",
    html: html || "<h1>This is sent from my Express API</h1>",
  })
}

module.exports = mailer