const nodemailer = require('nodemailer');
const config = require('./config');

// create reusable transporter object using the default SMTP transport
var basicTransporter = nodemailer.createTransport({
    host: config.sender.host,
    port: config.sender.port,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.sender.mail,
        pass: config.sender.passw
    }
});

/**
 * sends an email that the item was found
 * @param {String} website
 * @return {*}
 */
module.exports = function sendFoundMail(website) {
  // setup email data with unicode symbols
  var mailOptions = {
      from: `"Autobot 🤖" <${config.sender.mail}>`, // sender address
      to: config.recieveMails.join(", "), // list of receivers
      subject: `TERMINGEFUNDEN`, // Subject line
      text: `Yuhuuu ein TERMIN wurde GEFUNDEN auf ${website}`, // plain text body
      html: `
        <h1>🙌 ein TERMIN wurde GEFUNDEN auf</h1>
        <p>$${website}</p>
      `
  };

  // send mail with defined transport object
  basicTransporter.sendMail(mailOptions, (error, info) => {
      if (error) { return console.log(error); }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
