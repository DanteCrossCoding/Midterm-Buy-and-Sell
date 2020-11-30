const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:artist_id", (req, res) => {
    res.render("artist_page");
  });
  return router;
};
