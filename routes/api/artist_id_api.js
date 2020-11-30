const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/api/:artist_id", (req, res) => {
    const id = [req.params.artist_id];
    let query = `SELECT * FROM artists WHERE id = $1`;
    console.log("Artist called by ID", query, id);
    db.query(query, id)
      .then(data => {
        res.send(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
