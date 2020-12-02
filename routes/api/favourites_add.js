const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/add", (req, res) => {
    console.log(req.body);
    const productID = (req.body['productID']);
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
        console.log("post was successful", res.body);
        res.redirect('back');
      })
      .catch(err => {
        console.log("catch has fired", res.body, err);
        res
          .status(500)
          .json({ error: err.message });
      });


  });
  return router;
};
