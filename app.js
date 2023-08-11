const express = require('express');

const app = express();

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;
app.use(express.json());

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Sumber daya yang diminta tidak ada' });
});

app.use((req, res) => {
  res.status(500).json({ message: 'Kesalahan terjadi di server' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
