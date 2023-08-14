const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

// Menghubungkan ke MongoDB

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
main().catch((err) => console.log(err));

// Middleware untuk solusi otorisasi sementara
app.use((req, res, next) => {
  req.user = {
    _id: '64da43162ec43183b57c409d',
  };

  next();
});

// Middleware untuk memproses body JSON pada request
app.use(express.json());

// Menggunakan router
app.use(usersRouter);
app.use(cardsRouter);

// Middleware untuk menangani 404 (Sumber daya tidak ditemukan)
app.use((req, res) => {
  res.status(404).json({ message: 'Sumber daya yang diminta tidak ada' });
});

// Middleware untuk menangani error umum
app.use((req, res) => {
  res.status(500).json({ message: 'Kesalahan terjadi di server' });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
