const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add", (req, res) => {
    const productID = (req.body['favourite-button']);
    const userEmail = req.session.email;
    const query = `
    INSERT INTO favourites (user_id, product_id)
    VALUES (
      (SELECT id
      FROM users
      WHERE email = '${userEmail}')
      , ${productID})
    `;
    db.query(query)
      .then((data) => {
        res.end();
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });
  return router;
};
