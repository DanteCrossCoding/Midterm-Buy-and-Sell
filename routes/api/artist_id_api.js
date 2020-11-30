const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:artist_id/", (req, res) => {
    const id = [req.params.artist_id.substring(1)];
    let query = `SELECT artists.*, products.* FROM artists JOIN products ON artist_id = artists.id WHERE artists.id = $1 GROUP BY artists.id, products.id`;
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
