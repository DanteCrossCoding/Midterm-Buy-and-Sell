/* eslint-disable no-undef */
const createArtistPage = (artistData) => {
  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="${artistData.thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="artists/:${artistData.id}">${artistData.product_name}</a>
        </h4>
        <h5>${artistData.cost}</h5>
    </div>
  </div>
  `);

  return $artistCard;

};

const artistName = (artistData) => {
  return $(`<h2>${artistData[0].artist_name}</h2>`);
};

const artistWebsite = (artistWeb) => {
  return $(`<a href=${artistWeb[0].website}>Vist our website!</a>`);
};

$(() => {
  const num = window.location.pathname.split(':');
  $.ajax({
    method: "GET",
    url: `/api/artist/:${num[1]}/`
  }).done((data) => {
    if (data[0] === "artist only") {
      $('.col-lg-9').prepend(artistName(data[1]));
      $('.website').append(artistWebsite(data[1]));
    } else {
      $('.col-lg-9').prepend(artistName(data));
      $('.website').append(artistWebsite(data));
      for (product of data) {
        let $currArtistCard = createArtistPage(product);
        $('.row').append($currArtistCard);
      }
    }
  });
});
