/* eslint-disable no-undef */
const createFavourite = (favourite) => {
  const $favouriteItem = $(`
  <a href="#" class="list-group-item">${favourite.name}</a>
  `);
  return $favouriteItem;
};

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/favourites/list"
  }).done((favourites) => {
    for (favourite of favourites) {
      $('.list-group').append(createFavourite(favourite));
    }
  });
});
