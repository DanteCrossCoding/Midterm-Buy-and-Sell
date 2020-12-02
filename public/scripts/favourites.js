/* eslint-disable no-undef */
const createFavourite = (favourite) => {
  const $favouriteItem = $(`
  <a href="/products/:${favourite.id}" class="list-group-item">${favourite.name}
  <form action="/api/favourites/remove" method="POST">
  <input class="form-control" type="hidden" name="productID" value="${favourite.id}">
  <button type="submit">Delete</button>
  </form>
  </a>
  `);
  return $favouriteItem;
};
const favouritesList = function() {
  $.ajax({
    method: "GET",
    url: "/api/favourites/list"
  }).done((favourites) => {
    for (favourite of favourites) {
      $('.list-group').append(createFavourite(favourite));
    }
  });
};

$(() => {
  favouritesList();
});

