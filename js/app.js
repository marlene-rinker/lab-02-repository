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

  $animalTemplateClone.find('h2').text(this.title);
  $animalTemplateClone.find('img').attr('src', this.image_url);
  $animalTemplateClone.find('p').text(this.description);

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
  console.log($(this).val());
  // click handler works, but still need to add what happens - shows images based on keyword or "default" value
});


