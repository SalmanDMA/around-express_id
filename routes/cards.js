const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const dataFilePath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Kesalahan terjadi di server' });
      return;
    }

    const cardsData = JSON.parse(data);
    res.json(cardsData);
  });
});

module.exports = router;
