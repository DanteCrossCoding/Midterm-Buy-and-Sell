const { query } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    const artistId = req.body["artist-id-input"];
    const merchId = req.body['merch-id'];
    const merchName = req.body['merch-name-id'];
    const merchDescription = req.body['merch-description-id'];
    const cost = req.body.cost;
    const size = req.body['merch-size'];
    const thumbnailURL = req.body['merch-thumbnail-url-id'];
    const coverURL = req.body['merch-cover-photo-url-id'];
    const query = `
    INSERT INTO products (artist_id, merch_id, name, description, cost, size, thumbnail_photo_url, cover_photo_url, sold_out)
    VALUES(${artistId}, ${merchId}, '${merchName}', '${merchDescription}', '$${cost}', '${size}', '${thumbnailURL}', '${coverURL}', false)
    RETURNING *;
    `;
    console.log(query);
    db.query(query)
      .then((data) => {
        console.log('data added', data.rows);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });

  });
  return router;
};
