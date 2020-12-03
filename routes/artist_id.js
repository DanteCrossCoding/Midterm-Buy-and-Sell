const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/:artist_id", (req, res) => {
    const templateVars = { userEmail: req.session['user-email'], artistEmail: req.session['artist-email'] }
    res.render("artist_page", templateVars);
  });
  return router;
};
