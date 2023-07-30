const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require('path');
const routes = require('./controllers/');
const helpers = require('./utils/helpers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "secret_key",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(routes);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(require('./controllers'));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
