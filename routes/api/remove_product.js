const express = require('express');
const router  = express.Router();

module.exports = ((db) => {
  router.post('/', (req, res) => {
    const query = `
    DELETE FROM products WHERE id = ${req.body.productID} AND artist_id = (SELECT id FROM artists WHERE email = '${req.session.email}')
    `;
    db.query(query)
      .then((data) => {
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
