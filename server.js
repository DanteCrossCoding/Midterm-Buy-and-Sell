// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
const artistsRoutes = require("./routes/artists");
const artistsAPIRoutes = require("./routes/api/artists_api");
const artistProductsAPI = require("./routes/api/artist_id_api");
const artistIDRoutes = require("./routes/artist_id");
const artistPageAPI = require("./routes/api/artist_products.js");
const artistPage = require("./routes/artist_page.js");
const soldOut = require("./routes/api/sold_out.js");

const indexRedirect = require("./routes/index_redirect");
const indexRoutes = require("./routes/index");
const indexAPIRoutes = require("./routes/api/index_api");

const productsRoutes = require("./routes/products");
const productsAPIRoutes = require("./routes/api/products_api");
const productIDRoutes = require("./routes/product_id");
const productAPIRoutes = require("./routes/api/product_id_api");

const addProduct = require("./routes/add_product");
const addProductAPI = require("./routes/api/add_product");

const removeProduct = require("./routes/remove_product");
const removeProductAPI = require("./routes/api/remove_product");

const login = require("./routes/login");
const loginAPI = require("./routes/api/login_api");
const artistLoginAPI = require("./routes/api/artist_login");

const logout = require("./routes/logout");

const favouritesAdd = require("./routes/api/favourites_add");
const favouritesList = require("./routes/api/favourites_list");
const favouritesRemove = require("./routes/api/favourites_remove");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use(cookieSession({
  name: 'session',
  keys: ['user-email', 'user-password', 'artist-email', 'artist-password']
}));

app.use("/", indexRedirect());
// app.use("/users", usersRoutes(db));
app.use("/artists", artistsRoutes());
app.use("/artists/", artistIDRoutes());
app.use("/api/artists/", artistsAPIRoutes(db));
app.use("/api/artist/", artistProductsAPI(db));
app.use("artists/products", artistPage(db));
app.use("/api/artists/products", artistPageAPI(db));
app.use("/api/sold-out", soldOut(db));

app.use("/products", productsRoutes());
app.use("/api/products/", productsAPIRoutes(db));
app.use("/products/", productIDRoutes());
app.use("/api/products/", productAPIRoutes(db));

app.use("/index", indexRoutes());
app.use("/api/index/", indexAPIRoutes(db));


app.use("/addproduct", addProduct());
app.use("/api/addproduct/", addProductAPI(db));

app.use("/removeproduct", removeProduct());
app.use("/api/removeproduct/", removeProductAPI(db));

app.use("/login", login());
app.use("/api/login", loginAPI(db));
app.use("/api/artist-login", artistLoginAPI(db));

app.use("/logout", logout());

app.use("/api/favourites/", favouritesAdd(db));
app.use("/api/favourites/", favouritesList(db));
app.use("/api/favourites/", favouritesRemove(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
