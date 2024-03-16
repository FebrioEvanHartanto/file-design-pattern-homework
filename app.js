require("dotenv").config()
const express = require ("express")
const app = express()
const router = require("./routes")
const { sequelize } = require("./models")
const errorHandler = require("./middlewares/errorHandler.js")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(router);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    console.log(`App is listening on port ${port}`)
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});