//const express = require('express')
import express from 'express';
import configViewEngine from './configs/Viewengine';
import initWebRoute from "./route/web";
import initAPIRoute from './route/api';
import connection from "./configs/connectDB";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extend: true}));
app.use(express.json());
// Set up viewEngine
configViewEngine(app);

// Init web route
initWebRoute(app);

// Init API route
initAPIRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})