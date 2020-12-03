const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add", (req, res) => {
    const productID = (req.body['productID']);
    const userEmail = req.session['user-email'];
    const query = `
    INSERT INTO favourites (user_id, product_id)
    VALUES (
      (SELECT id
      FROM users
      WHERE email = $1)
      , $2)
    `;
    db.query(query, [userEmail, productID])
      .then(() => {
        res.redirect('back');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });
  return router;
};
