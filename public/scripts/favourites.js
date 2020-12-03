/* eslint-disable no-undef */
const createFavourite = (favourite) => {
  const $favouriteItem = $(`
  <a href="/products/:${favourite.id}" class="list-group-item">${favourite.name}
  <form class="delete-form" action="/api/favourites/remove" method="POST">
  <input class="form-control" type="hidden" name="productID" value="${favourite.id}">
  <button class="delete-button" type="submit">x</button>
  </form>
  </a>
  `);
  return $favouriteItem;
};

const $favouriteHeader = $(`
<h1 class="my-4">Favourites</h1>
<div class="list-group">
  <!-- insert filters here -->
</div>
`);

const favouritesList = function() {
  $.ajax({
    method: "GET",
    url: "/api/favourites/list"
  }).then((favourites) => {
    if (favourites !== "no data") {
      $('.col-lg-3').prepend($favouriteHeader);
      for (favourite of favourites) {
        $('.list-group').append(createFavourite(favourite));
      }
    }

  })
    .catch((error) => {
      console.log(error);
    });
};

$(() => {
  favouritesList();
});
