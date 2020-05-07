'use strict';

function AnimalImage(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

AnimalImage.filterArray = [];

AnimalImage.prototype.renderDropdown = function () {
  // let filterArray = [];
  if (!AnimalImage.filterArray.includes(this.keyword)) {
    const $animalFilterClone = $('option:first-child').clone();
    $animalFilterClone.attr('value', this.keyword);
    $animalFilterClone.text(this.keyword);
    $('select').append($animalFilterClone);
    AnimalImage.filterArray.push(this.keyword);
    // filterArray.push(this.keyword);
  }
};

AnimalImage.prototype.renderImages = function (filePath) {
  const $animalTemplateClone = $('#photo-template').clone();
  $animalTemplateClone.removeAttr('id').addClass('photo');
  $animalTemplateClone.removeAttr('id').addClass(filePath.slice(5, 11));
  $animalTemplateClone.find('h2').text(this.title);
  $animalTemplateClone.find('img').attr('src', this.image_url);
  $animalTemplateClone.find('p').text(this.description);
  // add data containing keyword to $animalTemplateClone
  $animalTemplateClone.data('keyword', this.keyword);
  $('main').append($animalTemplateClone);
};

// refactor notes:
// add arrayname.push(this) to constructor 
// push animal instance to global array
// loop through arrays for animal images and keyword filter
    // render page
    // set arrays to empty
    // call functions after empty

function addAnimalsToPage(filePath) {
  $.get(filePath, function (data) {
    data.forEach((animal) => {
      const newAnimal = new AnimalImage(
        animal.image_url,
        animal.title,
        animal.description,
        animal.keyword,
        animal.horns
      );
      newAnimal.renderImages(filePath);
      newAnimal.renderDropdown();
    });
  });
}

$('select').on('change', function () {
  // hide all photos
  $('.photo').hide();
  // render photos of animals matching keyword
  // jQuery .each takes in an index and then a value
  $('.photo').each((index, photo) => {
    if ($(this).val() === $(photo).data('keyword')) {
      $(photo).show();
    }
  });
});

// render data from page-1.json on initial page load
addAnimalsToPage('data/page-1.json');

// render data from page-2.json on button click
$('#pagination').on('click', function () {
  if ($('#pagination').hasClass('page1')) {
    $('#pagination').text('Previous Page');
    $('.photo').remove();
    $('option').not(':first').remove();
    AnimalImage.filterArray = [];
    addAnimalsToPage('data/page-2.json');
    $('.page-2').show();
    $('#pagination').removeClass('page1').addClass('page2');
  } else if ($('#pagination').hasClass('page2')) {
    $('#pagination').text('Next Page');
    $('.photo').remove();
    $('option').not(':first').remove();
    AnimalImage.filterArray = [];
    addAnimalsToPage('data/page-1.json');
    $('.page-1').show();
    $('#pagination').removeClass('page2').addClass('page1');
  }
});

