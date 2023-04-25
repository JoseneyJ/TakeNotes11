// All needed imports and variables 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// Routes variables 
const htmlRoutes = require('./routes/html');
const apiRoutes = require('./routes/api');

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listen for connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);