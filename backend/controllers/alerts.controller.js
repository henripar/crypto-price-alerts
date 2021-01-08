const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Mailjet',
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,

  }
})
exports.newLowPriceAlert = (req, res) => {
  // Code for new alert goes here
  const loop = () => {
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${req.body.ids}&vs_currencies=eur`)
    .then(result => {
      console.log('price' + result.data[req.body.ids].eur + ' alert' + req.body.alert_price);
      if(result.data[req.body.ids].eur < req.body.alert_price) {
        console.log('alert!');
          // send mail with defined transport object
   transporter.sendMail({
    from: `"Crypto Price Alerts" <${process.env.EMAIL}>`, // sender email
    to: req.body.email, // receiver email
    subject: `new ${req.body.ids} price alert`, // Subject line// plain text body
    html: `<div style="padding:20px; text-align:left;">
    <table align="center" style="background-color:rgba(18, 22, 28, 0.95); height:80%; padding:80px;">
    <tr>
    <td>
    <h1 style="padding-top:20px; color:#DBC787; text-align:left;">New price alert</h1>
    <h3 style="color:white; padding:10px 0px; text-align:left;">${req.body.ids} has dropped below
     ${req.body.alert_price}€!</h3>
    <p style="color:#76808F; padding:10px auto; text-align:center;">You ordered this price alert from Crypto Price Alerts.</p>
    </td>
    </tr>
    </table>
    </div>`, // html body
  });
      
      }
      else setTimeout(()=> {
        loop()
      }, 90000);
    })
  }
  res.send(`New alert for ${req.body.ids} has been created to alert below ${req.body.alert_price}!`);
   loop();

};

exports.newHighPriceAlert = (req, res) => {
  // Code for new alert goes here
  const loop = () => {
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${req.body.ids}&vs_currencies=eur`)
    .then(result => {
      console.log('price' + result.data[req.body.ids].eur + ' alert' + req.body.alert_price);
      if(result.data[req.body.ids].eur > req.body.alert_price) {
        console.log('alert!');
          // send mail with defined transport object
   transporter.sendMail({
    from: `"Crypto Price Alerts" <${process.env.EMAIL}>`, // sender address
    to: req.body.email, // list of receivers
    subject: `new ${req.body.ids} price alert`, // Subject line
    html: `<div style="padding:auto; text-align:left; height:100%;">
    <table align="center" margin-top:40px; style="background-color:rgba(18, 22, 28, 0.95); height:80%; padding:80px;">
    <tr>
    <td>
    <h1 style="padding-top:20px; color:#DBC787; text-align:left;">New price alert</h1>
    <h3 style="color:white; padding:10px 0px; text-align:left;">${req.body.ids} has reached over ${req.body.alert_price}€!</h3>
    <p style="color:#76808F; padding:10px auto; text-align:center;">You ordered this price alert from Crypto Price Alerts.</p>
    </td>
    </tr>
    </table>
    </div>`, // html body
  });
      
      }
      else setTimeout(()=> {
        loop()
      }, 90000);
    })
  }
  res.send(`New alert for ${req.body.ids} has been created to alert over ${req.body.alert_price}!`);
   loop();

};
