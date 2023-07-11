const findAlbum = require('./FindAlbum');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

app.get('/SongAlbum',(req,res) => {
    findAlbum(req.query.directoryPath).then(response => {
        res.json(response)
    });
})

app.listen(3001, () => {
    console.log('Blud is listening on port 3001')
})
