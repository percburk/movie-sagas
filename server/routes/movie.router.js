const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route for all movies and their corresponding genres
router.get('/', (req, res) => {
  const sqlText = `
    SELECT "movies".*, ARRAY_AGG("genres".name) AS "genre_group" FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
    JOIN "genres" ON "movies_genres".genre_id = "genres".id
    GROUP BY "movies".id ORDER BY "movies".title;
  `;

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// GET route for one movie for details and corresponding genres
router.get('/:id', (req, res) => {
  const sqlText = `
    SELECT "movies".*, ARRAY_AGG("genres".name) AS "genre_group" FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movie_id
    JOIN "genres" ON "movies_genres".genre_id = "genres".id
    WHERE "movies".id = $1 GROUP BY "movies".id;
  `;

  pool
    .query(sqlText, [req.params.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

// POST route to add a new movie and genres
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will return back the id of the newly created movie
  const sqlTextNewMovie = `
    INSERT INTO "movies" ("title", "poster", "description")
    VALUES ($1, $2, $3)
    RETURNING "id";
  `;

  // This first query makes the movie
  pool
    .query(sqlTextNewMovie, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); // ID is here
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const sqlTextNewMovieGenre = `
        INSERT INTO "movies_genres" ("movies_id", "genres_id")
        VALUES  ($1, $2);
      `;

      // Second query adds genre to the new movie
      pool
        .query(sqlTextNewMovieGenre, [createdMovieId, req.body.genre_id])
        .then(res.sendStatus(201)) // send back success!
        .catch((err) => {
          // Catch for second query
          console.log(`error in POST with query ${sqlTextNewMovieGenre}`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // Catch for first query
      console.log(`error in POST with query ${sqlTextNewMovie}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
