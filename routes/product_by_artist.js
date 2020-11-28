const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:artist_id/products", (req, res) => {
    const id = [req.params.artist_id];
    let query = `SELECT products.name as product_name, artists.name as artist_name FROM products JOIN artists ON artists.id = artist_id WHERE artists.id = $1`;
    console.log(query, id);
    db.query(query, id)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
