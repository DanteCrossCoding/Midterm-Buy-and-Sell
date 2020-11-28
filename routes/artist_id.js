const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:artist_id", (req, res) => {
    const id = [req.params.artist_id];
    let query = `SELECT * FROM artists WHERE id = $1`;
    console.log(query, id);
    db.query(query, id)
      .then(data => {
        const artists = data.rows;
        res.json({ artists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
