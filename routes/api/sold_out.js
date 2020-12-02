const express = require('express');
const router  = express.Router();

module.exports = ((db) => {
  router.post('/', (req, res) => {
    const productID = req.body.productID;
    const query = `
    UPDATE products SET sold_out = true WHERE id = ${productID}
    `;
    db.query(query)
      .then(() => {
        res.redirect("back");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
});
