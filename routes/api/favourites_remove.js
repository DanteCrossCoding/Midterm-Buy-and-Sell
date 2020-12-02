const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/remove", (req, res) => {
    const productID = req.body.productID;
    const email = req.session.email;
    const query = `
    DELETE FROM favourites
    WHERE product_id = ${productID} AND user_id = (SELECT id FROM users WHERE email = '${email}');
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
};
