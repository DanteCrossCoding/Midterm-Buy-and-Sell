const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
  });
}
