const cors = require('cors');
const express = require('express');
const findAlbum = require('./FindAlbum');
const mailer = require('nodemailer');

module.exports = (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (req.url.startsWith('/SongAlbum')) {
        handleSongAlbum(query, res);
      } else if (req.url.startsWith('/sendEmail')) {
        handleSendEmail(query, res);
      } else {
        res.status(404).end();
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function handleSongAlbum(query, res) {
  findAlbum(query.directoryPath)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}

function handleSendEmail(query, res) {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ detail: error, code: 500 });
    } else {
      res.json({ details: info.response, code: 200 });
    }
  });
}