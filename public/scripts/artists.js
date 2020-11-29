const createArtistCard = (artistData) => {

  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card">
      <img class="card-img-top" src=${artistData.website} alt="">
      <div class="card-body">
        <p class="card-text">${artistData.name}</p>
      </div>
    </div>
  </div>
  `);

  return $artistCard;

}

$(() => {
  $.ajax({
    method: "GET",
    url: "/artists/api"
  }).done((artists) => {
    for(artist of artists) {
      let $currArtistCard = createArtistCard(artist);
      $('.row').append($currArtistCard);
    }
  });;
});
