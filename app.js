const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  fs.readFile('memes.json', 'utf8', (err, data) => {
    if (err) throw err;
    const memes = JSON.parse(data);
    memes.links.sort((a,b) => 0.5 - Math.random())
    res.render('index', {
      memes: memes.links
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})