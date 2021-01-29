const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title";`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the newly created movie
  const insertMovieQuery = `
    INSERT INTO "movies" ("title", "poster", "description")
    VALUES ($1, $2, $3)
    RETURNING "id";
  `;

  // This first query makes the movie
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); // ID is here
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movies_id", "genres_id")
        VALUES  ($1, $2);
      `;

      // Second query adds genre to the new movie
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          // Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // Catch for second query
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
