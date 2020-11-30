/* eslint-disable no-undef */
const createArtistPage = (artistData) => {
  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="${artistData[0].thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="artists/:${artistData[0].id}">${artistData[0].name}</a>
        </h4>
        <h5>${artistData[0].cost}</h5>
    </div>
  </div>
  `);

  return $artistCard;

};


$(() => {
  const num = window.location.pathname.split(':');
  $.ajax({
    method: "GET",
    url: `/api/artist/:${num[1]}/`
  }).done((data) => {
    let $currArtistCard = createArtistPage(data);
    $('.row').append($currArtistCard);
  });
});
