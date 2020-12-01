const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:artist_id/", (req, res) => {
    const id = [req.params.artist_id.substring(1)];
    let query = `SELECT artists.id, artists.website, products.id as product_id, artists.name as artist_name, products.thumbnail_photo_url, products.name as product_name, products.cost, artists.image as artist_image FROM artists JOIN products ON artist_id = artists.id WHERE artists.id = $1 GROUP BY artists.id, products.id`;
    console.log("Artist called by ID", id);
    db.query(query, id)
      .then(data => {
        if (data.rows.length === 0) {
          query = `SELECT name as artist_name, website, id, image as artist_image FROM artists WHERE id = $1`;
          db.query(query, id)
            .then(data => {
              res.send(["artist only", data.rows]);
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          res.send(data.rows);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
