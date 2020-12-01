const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/:product_id", (req, res) => {
    res.render('product_page');
  });
  return router;
};
