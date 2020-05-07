/* global Handlebars */
'use strict';

AnimalImage.keywords = [];
AnimalImage.allImages = [];

function AnimalImage(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}
TODO:
// In the front end, the section with id of photo-template needs to have a class= to handlebars version of keyword
// Console logs in initial render to page function - image array and keyword array - make sure we're getting it back 
// probably getting it back and not getting it right on the front end

AnimalImage.prototype.renderImages = function () {
  const $animalTemplate = $('#photoTemplate').html();
  const result = Handlebars.compile($animalTemplate);
  return result(this);
};


AnimalImage.addAnimalsToPage = (filePath) => {
  $.get(`data/${filePath}.json`, 'json')
    .then(data => {data.forEach(image => {
      AnimalImage.allImages.push(new AnimalImage(image))
    })})
    .then(renderDropdown)
    .then(AnimalImage.loadImages)
    .then(AnimalImage.loadKeywords)
}


function renderDropdown() {
  AnimalImage.allImages.forEach(image => {
    if (!AnimalImage.keywords.includes(image.keyword)) {
      AnimalImage.keywords.push(image.keyword);
    }
  })
}

AnimalImage.loadImages = () => {
  AnimalImage.allImages.forEach(image => {
    $('#finalImage').append(image.renderImages());
  })
}

AnimalImage.loadKeywords = () => {
  AnimalImage.keywords.forEach(keyword => {
    $('dropdown').append(`<option class="filter-remove" value="${keyword}">${keyword}</option>`)
  })
}

$('#filter').on('change', function() {
  let $dropdown = $(this).val();
  $('section').hide();
  $(`section[class="${$dropdown}"]`).show();
})

$('#dropdown').on('change', function(){
  $('').remove();
  $('').remove();
  let $value = $(this).val();
  AnimalImage.allImages = [];
  AnimalImage.keywords = [];
  AnimalImage.addAnimalsToPage($value);
})




