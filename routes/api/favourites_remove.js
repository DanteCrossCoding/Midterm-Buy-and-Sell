const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/remove", (req, res) => {
    const productID = req.body.productID;
    const email = req.session.email;
    const query = `
    DELETE FROM favourites
    WHERE product_id = $1 AND user_id = (SELECT id FROM users WHERE email = $2);
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
};
