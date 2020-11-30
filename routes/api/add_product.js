const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log("form data:", req.body);
    const query = `

    `;
    res.redirect("/");
  });
  return router;
};
