const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routesUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключение бд к проетку

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '60cd31414c443e434c4f9a5a', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use(routesUser);
app.use(routerCard);
app.use((req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
