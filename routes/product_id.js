const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/:product_id", (req, res) => {
    const templateVars = { userEmail: req.session['user-email'], artistEmail: req.session['artist-email'] }
    res.render('product_page', templateVars);
  });
  return router;
};
