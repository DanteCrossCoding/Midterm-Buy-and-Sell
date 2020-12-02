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
        <form action="/api/favourites/add" method="POST">
        <input class="form-control" type="hidden" name="productID" value="${productData.id}">
        <button type="submit">Favorite</button>
      </form>
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

const artistImage = (artistData) => {
  return $(`<img class="d-block img-fluid" src=${artistData[0].artist_image}>
  </div>`);
};

const productArray = [];



const writeProducts = (productData) => {
  $('.row').append(createArtistPage(productData));
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
      $('.band-photo').prepend(artistImage(data[1]));
    } else {
      $('.col-lg-9').prepend(artistName(data));
      $('.website').append(artistWebsite(data));
      $('.band-photo').prepend(artistImage(data));
      for (product of data) {
        writeProducts(product);
        productArray.push(product);
      }
    }
  });
  $("#lth-button").click(function() {
    console.log(productArray);
    productArray.sort(function(a, b) {
      if (a.cost < b.cost) {
        return -1;
      }

      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
    $('.row').empty();
    for (product of productArray) {
      writeProducts(product);
    }
  });

  $("#htl-button").click(function() {
    productArray.sort(function(a, b) {
      if (a.cost > b.cost) {
        return -1;
      }

      if (a.cost < b.cost) {
        return 1;
      }

      return 0;
    });
    $('.row').empty();
    for (product of productArray) {
      writeProducts(product);
    }
  });
});
