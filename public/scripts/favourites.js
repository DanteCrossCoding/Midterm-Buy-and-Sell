/* eslint-disable no-undef */


$(() => {
  $.ajax({
    method: "GET",
    url: "/api/favourites/list"
  }).done((favourites) => {
    console.log(favourites);
  });
});
