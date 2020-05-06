'use strict';

//website should render animal images

function AnimalImage(image_url, title, description, keyword, horns){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

AnimalImage.filterArray = [];

AnimalImage.prototype.renderFilters = function () {
  if(!AnimalImage.filterArray.includes(this.keyword)){
    const $animalFilterClone = $('option:first-child').clone();
    $animalFilterClone.attr('value', this.keyword);
    $animalFilterClone.text(this.keyword);
    $('select').append($animalFilterClone);
    AnimalImage.filterArray.push(this.keyword);
  }
};


AnimalImage.prototype.renderImages = function (){
  const $animalTemplateClone = $('#photo-template').clone();
  $animalTemplateClone.removeAttr('id').addClass('photo');
  $animalTemplateClone.find('h2').text(this.title);
  $animalTemplateClone.find('img').attr('src', this.image_url);
  $animalTemplateClone.find('p').text(this.description);
  // add data containing keyword to $animalTemplateClone
  $animalTemplateClone.data('keyword', this.keyword);
  $('main').append($animalTemplateClone);
};

$.get('data/page-1.json', function(data){
  data.forEach(animal => {
    const newAnimal = new AnimalImage(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns);
    newAnimal.renderImages();
    newAnimal.renderFilters();
  });
});

$('select').on('change', function(){
  // hide all photos
  $('.photo').hide();
  // render photos of animals matching keyword
  // jQuery .each takes in an index and then a value
  $('.photo').each((index, photo) => {
    if ($(this).val() === $(photo).data('keyword')) {
      $(photo).show();
    }
  })
});