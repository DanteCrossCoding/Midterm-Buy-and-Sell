/* eslint-disable no-undef */
const createArtistCard = (artistData) => {

  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card">
      <img class="card-img-top" src=${artistData.website} alt="">
      <div class="card-body">
        <p class="card-text">
        <a href="/artists/:${artistData.id}">${artistData.name}</a>
        </p>
      </div>
    </div>
  </div>
  `);

  return $artistCard;

};

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/artists/"
  }).done((artists) => {
    // console.log(artists);
    for (artist of artists) {
      let $currArtistCard = createArtistCard(artist);
      $('.row').append($currArtistCard);
    }
  });
});
