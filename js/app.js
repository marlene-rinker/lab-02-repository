'use strict';
/* global Handlebars $ */

// TODO: figure out why page-1 is rendering twice

function AnimalImage(image_url, title, description, keyword, horns, page){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.page = page;
  AnimalImage.all.push(this);
}

AnimalImage.filterArray = [];

// come back to this
AnimalImage.prototype.renderFilters = function () {
  if(!AnimalImage.filterArray.includes(this.keyword)){
    const $animalFilterClone = $('option:first-child').clone();
    $animalFilterClone.attr('value', this.keyword);
    $animalFilterClone.text(this.keyword);
    $animalFilterClone.attr('class', this.page);
    $('select').append($animalFilterClone);
    AnimalImage.filterArray.push(this.keyword);
    AnimalImage.filterArray.push(this.page);
  }
};

AnimalImage.all = [];


AnimalImage.shownImages = 'page-1';

AnimalImage.prototype.renderImages = function (){
  const template = Handlebars.compile($('#animal-template').html());
  const result = template(this);
  $('main').append(result);
};

function handleData(dataFromFile, pageNumber) {
  dataFromFile.forEach(val => createAnimalImages(val, pageNumber));
}

function createAnimalImages(animal, page) {
  new AnimalImage(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns, page);
}



// switch pages
const switchPages = () => {
  $('section').hide();
  if(AnimalImage.shownImages === 'page-1') {
    AnimalImage.shownImages = 'page-2';
    $('.page-2').show();
    sortByTitle();
  } else {
    AnimalImage.shownImages = 'page-1';
    $('.page-1').show();
    sortByTitle();
  }
}


$('#switch').on('click', switchPages);

$.get('data/page-1.json', data => {
  handleData(data, 'page-1');
});
$.get('data/page-2.json', data => {
  handleData(data, 'page-2');
  sortByTitle();
  $('.page-2').hide();
})


$('#sort-horns').on('click', () => {
  $('main').empty();
  AnimalImage.all.sort((left, right) => {
    if(left.horns > right.horns) {
      return 1;
    } else if (left.horns < right.horns) {
      return -1;
    } else {
      return 0;
    }
  })
  AnimalImage.all.forEach(img => img.renderImages());
  $('section').hide();
  $(`.${AnimalImage.shownImages}`).show();
});

$('#sort-title').on('click', () => {
  sortByTitle();
});

// $('#dropdown').on('change', () => {
//   $('section').hide();
//   $(`.${AnimalImage.shownImages}`).show();

// });

function sortByTitle() {
  $('main').empty();
  AnimalImage.all.sort((left, right) => {
    if(left.title > right.title) {
      return 1;
    } else if (left.title < right.title) {
      return -1;
    } else {
      return 0;
    }
  })
  AnimalImage.all.forEach(img => img.renderImages());
  $('section').hide();
  $(`.${AnimalImage.shownImages}`).show();
}


