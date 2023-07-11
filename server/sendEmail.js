const cors = require('cors');
const express = require('express');
const mailer = require('nodemailer');

const app = express();
app.use(cors());

app.get('/sendEmail',(req,res) => {
    var transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'azri.mokhzani@gmail.com',
        pass: 'cnkzstjbhorpdcef'
      }
    });
    
    var mailOptions = {
      from: req.query.gmail,
      to: 'azri.mokhzani@gmail.com',
      subject: req.query.name + ' wants to send a message from Website',
      html: req.query.text + '<br/>' + req.query.phone
    };
    
    return new Promise((resolve,reject) => {
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            reject(error);
            res.json({detail: error,code:500})
          } else {
            resolve(info.response)
            res.json({details :info.response, code:200});
          }
        });
    }) 
})

app.listen(3001, () => {
    console.log('Blud is listening on port 3001')
})
