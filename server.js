const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on connection to server
app.listen(PORT, () => console.log('Now listening'));