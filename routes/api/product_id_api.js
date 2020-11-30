const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:product_id/api", (req, res) => {
    const id = [req.params.product_id.substring(1)];
    let query = `SELECT * FROM products WHERE id = $1`;
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
