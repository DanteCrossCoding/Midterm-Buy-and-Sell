const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:product_id", (req, res) => {
    const id = [req.params.product_id];
    let query = `SELECT * FROM products WHERE id = $1`;
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
