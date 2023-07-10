const cors = require('cors');
const express = require('express');
const findAlbum = require('./FindAlbum');
const mailer = require('nodemailer');

module.exports = async (req, res) => {
  const { query, path } = req;

  if (path.startsWith('/SongAlbum')) {
    try {
      const response = await findAlbum(query.directoryPath);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (path.startsWith('/sendEmail')) {
    try {
      const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'azri.mokhzani@gmail.com',
          pass: 'cnkzstjbhorpdcef'
        }
      });

      const mailOptions = {
        from: query.gmail,
        to: 'azri.mokhzani@gmail.com',
        subject: `${query.name} wants to send a message from the website`,
        html: `${query.text}<br/>${query.phone}`
      };

      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ details: info.response, code: 200 });
    } catch (error) {
      res.status(500).json({ detail: error, code: 500 });
    }
  } else {
    res.status(404).end();
  }
};
