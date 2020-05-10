'use strict';
/* global Handlebars $ */


function AnimalImage(image_url, title, description, keyword, horns, page){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.page = page;
  AnimalImage.all.push(this);
  if (AnimalImage.filterArray[page] === undefined) {
    AnimalImage.filterArray[page] = [];
  }
  if(!AnimalImage.filterArray[page].includes(this.keyword)){
    AnimalImage.filterArray[page].push(this.keyword);
  }
}

AnimalImage.filterArray = [];

function renderFilters() {
  $('option').not(':first').remove();
  AnimalImage.filterArray[AnimalImage.shownImages].forEach(val => {
    const $animalFilterClone = $('option:first-child').clone();
    $animalFilterClone.attr('value', val);
    $animalFilterClone.text(val);
    $('select').append($animalFilterClone);
  })
}

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

$('#dropdown').on('change', () => {
  let chosen = $( "#dropdown option:selected" ).text();
  console.log (chosen);
  $('section').hide();
  $(`.${chosen}` + `.${AnimalImage.shownImages}`).show()

});

function sortByTitle() {
  renderFilters();

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


