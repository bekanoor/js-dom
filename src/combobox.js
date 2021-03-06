function ComboboxCreator(wrapper, data, placeholder, onChange) {
  var placeholder = placeholder
  var wrapper = wrapper
  var data = data

  function createList(data) {
    var listContainer = wrapper.childNodes[2]
    var list = document.createElement('ul')

    data.map(function (item) {
      var text = document.createElement('li')

      text.classList.add('list__item')
      text.textContent = item.label
      text.id = item.id
      list.appendChild(text)
    })

    listContainer.appendChild(list)
    list.classList.add('list')

    list.addEventListener('click', pickItem)
  }

  function clearList() {
    var listContainer = wrapper.childNodes[2]

    listContainer.removeChild(listContainer.firstChild)
  }

  function pickItem(e) {
    var listContainer = wrapper.childNodes[2]
    var input = wrapper.childNodes[1].firstChild

    onChange(e.target.textContent)
    onChange(e.target.id)

    input.value = e.target.textContent
    listContainer.classList.remove('active-dropdown')
  }

  function scrollController(data) {
    var container = wrapper.childNodes[2]

    data.length > 5
      ? container.classList.add('_scroll')
      : container.classList.remove('_scroll')
  }

  function createCombobox() {
    var comboboxDiv = document.createElement('div')
    comboboxDiv.classList.add('combobox')

    var input = document.createElement('input')
    input.classList.add('combobox__input')
    input.setAttribute('placeholder', placeholder)

    var cross = document.createElement('button')
    cross.classList.add('combobox__button')
    cross.innerHTML =
      '<img class="combobox__cross" src="https://img.icons8.com/fluency-systems-filled/48/000000/x.png"/>'

    var arrow = document.createElement('button')
    arrow.classList.add('combobox__button')
    arrow.innerHTML =
      '<img class="combobox__arrow" on src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/32/000000/external-down-arrow-arrows-kmg-design-basic-outline-kmg-design.png"/>'

    var list = document.createElement('div')
    list.classList.add('combobox__list-container')

    var showCBList = function () {
      list.classList.contains('active-dropdown')
        ? list.classList.remove('active-dropdown')
        : list.classList.add('active-dropdown')
      scrollController(data)
    }

    comboboxDiv.appendChild(input)
    comboboxDiv.appendChild(cross)
    comboboxDiv.appendChild(arrow)
    wrapper.appendChild(comboboxDiv)
    wrapper.appendChild(list)

    arrow.addEventListener('click', showCBList)
    input.addEventListener('focus', showCBList)
    cross.addEventListener('click', function () {
      input.value = ''
      clearList()
      createList(data)
      onChange('clear')
    })
    document.body.addEventListener('mousedown', function (e) {
      if (!e.target.classList[0] || e.target.classList[0] === 'wrapper')
        list.classList.remove('active-dropdown')
    })
    window.addEventListener('resize', function () {
      var space = window.innerHeight - wrapper.offsetTop

      list.classList.remove('active-dropdown')

      if (space < 170) {
        list.classList.add('_top-direction')
      } else {
        list.classList.remove('_top-direction')
      }
    })
    window.addEventListener('scroll', function () {
      list.classList.remove('active-dropdown')
    })
  }

  function search() {
    var input = wrapper.childNodes[1].firstChild

    var match = function (e) {
      var list = wrapper.childNodes[2].firstChild
      var results = []
      var search = e.target.value

      for (var i = 0; i < data.length; i++) {
        var copy = JSON.parse(JSON.stringify(data))

        for (key in copy[i]) {
          if (!String.prototype.startsWith) {
            Object.defineProperty(String.prototype, 'startsWith', {
              enumerable: false,
              configurable: false,
              writable: false,
              value: function (searchString, position) {
                position = position || 0
                return this.indexOf(searchString, position) === position
              },
            })
          }

          if (key === 'label') copy[i][key] = copy[i][key].toLowerCase()

          if (key === 'label' && copy[i][key].startsWith(search))
            results.push(data[i])
        }
      }

      clearList()

      createList(results)

      scrollController(results)

      if (results.length === 0 && search.length > 0) {
        var list = wrapper.childNodes[2].firstChild
        var li = document.createElement('li')

        li.classList.add('_no-options')
        li.textContent = 'No options'

        list.appendChild(li)
        return
      }

      list.addEventListener('click', pickItem)
    }

    input.addEventListener('keyup', match)
  }

  this.add = function () {
    createCombobox()
    createList(data)
    search()
  }
  this.setValue = function (value) {
    var input = wrapper.childNodes[1].firstChild

    input.value = ''
    input.value = value
  }
  this.getValue = function () {
    var input = wrapper.childNodes[1].firstChild

    return input.value
  }

  document.addEventListener('DOMContentLoaded', function () {
    var list = wrapper.childNodes[2].firstChild

    list.addEventListener('click', pickItem)
  })
}
