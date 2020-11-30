const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/api", (req, res) => {
    let query = `
    SELECT products.*
    FROM products
    JOIN order_products ON product_id = products.id
    GROUP BY products.id
    ORDER BY count(product_id) DESC LIMIT 6;`;
    console.log("Product API called", query);
    db.query(query)
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
