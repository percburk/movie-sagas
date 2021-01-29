const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route for all genres from DB
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "genres" ORDER BY "name";`;

  pool
    .query(sqlText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in GET with query ${sqlText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
