const express = require('express');
const router  = express.Router();

module.exports = ((db) => {
  router.post('/', (req, res) => {
    const productID = req.body.productID;
    const email = req.session.email;
    const query = `
    DELETE FROM products WHERE id = $1 AND artist_id = (SELECT id FROM artists WHERE email = $2)
    `;
    db.query(query, [productID, email])
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
