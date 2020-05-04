const express = require("express");
const logger = require('morgan')
const cors = require("cors");
const moongose = require("mongoose");
const requireDir = require("require-dir");

const { config } = require("dotenv");
if (process.env.NODE_ENV === "production") {
  config({ path: "./src/config/.env.prod" });
} else {
  config({ path: "./src/config/.env.dev" });
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

moongose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

requireDir("./src/models");

app.use('/ads', require('./src/routes/AdsRouter'))
app.use('/products', require('./src/routes/ProductRouter'))
app.use('/watson', require('./src/routes/WatsonHookRouter'))


app.listen(process.env.PORT || 3000);
