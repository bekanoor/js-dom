var container1 = document.querySelector('.combobox-container-1')
var container2 = document.querySelector('.combobox-container-2')

var games = [
  {
    label: 'Witcher 3',
    id: 0,
  },
  {
    label: 'Super meat boy',
    id: 1,
  },
  {
    label: 'Elden ring',
    id: 2,
  },
  {
    label: 'Dark souls 3',
    id: 3,
  },
  {
    label: 'Sekiro',
    id: 4,
  },
  {
    label: 'Resident evil 2 remake',
    id: 5,
  },
  {
    label: 'Visage',
    id: 6,
  },
  {
    label: 'Everlasting summer',
    id: 7,
  },
  {
    label: 'Half-life 3',
    id: 8,
  },
]

var movies = [
  {
    label: 'Forrest Gump',
    id: 0,
  },
  {
    label: 'The house Jack built',
    id: 1,
  },
  {
    label: 'Terminator 2: Judgment Day',
    id: 2,
  },
  {
    label: 'Spider-man 2',
    id: 3,
  },
  {
    label: 'Gummi Bears',
    id: 4,
  },
]

const gameList = new ComboboxCreator(container1, games, 'games', function (
  item
) {
  console.dir(item)
})

gameList.add()

const moviesList = new ComboboxCreator(container2, movies, 'movies',  function (
  item
) {
  console.dir(item)
})

moviesList.add()
