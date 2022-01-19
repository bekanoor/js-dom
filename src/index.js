var container1 = document.querySelector('.combobox-container-1');
var container2 = document.querySelector('.combobox-container-2');

var games = [
  {
    label: 'witcher 3',
    id: 0,
  },
  {
    label: 'super meat boy',
    id: 1,
  },
  {
    label: 'elden ring',
    id: 2,
  },
  {
    label: 'dark souls 3',
    id: 3,
  },
  {
    label: 'sekiro',
    id: 4,
  },
  {
    label: 'resident evil 2 remake',
    id: 5,
  },
];


function ComboboxCreator (wrapper, data, placeholder) {
  var placeholder = placeholder;
  var wrapper = wrapper;
  var data = data;

  this.fillList = function () {
    var list = document.createElement('ul');
    list.classList.add('combobox__list');

    var container = document.querySelector('.combobox__list-container');
    data.map( function(item) {
      var text = document.createElement('li');

      text.classList.add('combobox__item');
      text.textContent = item.label;
      text.id = item.id;
      list.appendChild(text);
    });

    container.appendChild(list);
    list.addEventListener('click', function () {console.log('hi')});
  }

  this.createCombobox = function () {
    var comboboxDiv = document.createElement('div');
    comboboxDiv.classList.add('combobox');

    var input = document.createElement('input');
    input.classList.add('combobox__input');
    input.setAttribute('placeholder', placeholder);

    var button = document.createElement('button');
    button.classList.add('combobox__button');
    button.innerHTML = '<img class="combobox__arrow" src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/32/000000/external-down-arrow-arrows-kmg-design-basic-outline-kmg-design.png"/>';

    var list = document.createElement('div');
    list.classList.add('combobox__list-container');

    wrapper.appendChild(comboboxDiv);
    comboboxDiv.appendChild(input);
    comboboxDiv.appendChild(button);
    wrapper.appendChild(list);

    var showCBList = function() {
      list.classList.contains('active-arrow') ? list.classList.remove('active-arrow') : list.classList.add('active-arrow')
    };

    button.addEventListener('click', showCBList);
    input.addEventListener('focus', showCBList);
    input.addEventListener('blur', function() {
      list.classList.remove('active-arrow')
    });
  }
}

const gameList = new ComboboxCreator(container1, games, 'games');

gameList.createCombobox();
gameList.fillList();
