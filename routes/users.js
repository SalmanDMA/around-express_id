const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(usersDataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Kesalahan terjadi di server' });
      return;
    }

    const usersData = JSON.parse(data);
    res.json(usersData);
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  fs.readFile(usersDataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Kesalahan terjadi di server' });
      return;
    }

    const usersData = JSON.parse(data);
    const user = usersData.find((user) => user._id === userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
  });
});

module.exports = router;
