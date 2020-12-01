const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = `
    SELECT * FROM users;
    `;
    console.log(query);
    db.query(query)
      .then((data) => {
        if (email.length === 0 || password.length === 0) {
          return res.status(403).send('Error: Please enter a valid email address and password.');
        }
        req.session.email = email;
        req.session.password = password;
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });

  });
  return router;
};
