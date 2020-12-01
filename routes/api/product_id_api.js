const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:product_id/", (req, res) => {
    const id = [req.params.product_id.substring(1)];
    let query = `SELECT products.*, artists.email as artist_email FROM products JOIN artists ON artist_id = artists.id WHERE products.id = $1 GROUP BY products.id, artist_email`;
    console.log("Product called by ID", id);
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
