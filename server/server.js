const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router.js')
const genreRouter = require('./routes/genre.router.js')
const port = process.env.PORT || 5000;

// Middleware -------------------
app.use(bodyParser.json());
app.use(express.static('build'));

// Routes -------------------------
app.use('/api/movie', movieRouter);
app.use('/api/genre', genreRouter)

// Start Server -----------------------------
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
