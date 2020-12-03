const merchTypes = (merchData) => {
  const $merchList = `
  <option value=${merchData.id}>${merchData.merch_type}</option>
  `;
  return $merchList;
};


$(() => {
  $.ajax({
    method: "GET",
    url: "api/merchid"
  }).done((data) => {
    for (merch of data) {
      $('.merch-type').append(merchTypes(merch));
    }
  })
});
