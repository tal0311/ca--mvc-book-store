'use strict'

var gCurrBook

function initShop() {
  renderBooks()
}

function renderBooks() {
  const books = getBooksForDisplay()

  var strHTMLs = books.map(
    //todo: add buttons for rating
    (book) => `
   <tr>
          <td name="bookId">${book.id}</td>
          <td>${book.price}</td>
          <td>${book.bookName}</td>
          <td class="actions-container">
            <button class="btn read-btn" onclick="onReadBook('${book.id}')">read</button>
            <button class="btn update-btn" onclick="onOpenUpdateModal('${book.id}')">
              update
            </button>
            <button class="btn delete-btn" onclick="onDeleteBook('${book.id}')">
              delete
            </button>
          </td>
           <td>${book.rate}</td>
        </tr>

  `
  )

  document.querySelector('.main').innerHTML = strHTMLs.join('')
}

function renderBookModal(book) {
  const strHTML = `

    <article class="book-modal">
      <button onclick="onCloseModal()">close Summery</button>
      <div>
        <h4>${book.bookName}</h4>
        <div class="img-container">
          <img src="${book.imgUrl}" alt="" />
        </div>
        <div class="book-info">
          <small>author</small>
         <div class="rating-container">
           <button class="rate-btn plus"  onclick="onRateChange('${
             book.id
           }' , 1)">+</button> <span>${book.rate}</span>
            <button class="rate-btn minus" onclick="onRateChange('${
              book.id
            }', -1)">-</button>
         </div>
          <p>
            ${makeLorem()}
          </p>
        </div>
      </div>
    </article>
`

  document.querySelector('.modal-entire').innerHTML = strHTML
}

//!always rerender here
function onDeleteBook(BookId) {
  deleteBook(BookId)
  renderBooks()
}

function onAddBook() {
  const bookName = document.querySelector('input[name="book-name"]').value
  const price = document.querySelector('input[value="book-price"]').value

  if (!bookName.length || price === null) {
    document.querySelector('h1').innerText = 'A book must have a price and name'

    setTimeout(() => {
      document.querySelector('h1').innerText = 'Book-Shop'
    }, 3000)

    return
  }

  const randomUrl = imgUrls[Math.floor(Math.random() * imgUrls.length)]
  console.log(randomUrl)

  addBook(bookName, price, randomUrl)
  renderBooks()
}

function onUpdateBook() {
  const updatedPrice = document.querySelector(
    '.update-book input[name="price"]'
  ).value

  if (updatedPrice) {
    updateBook(gCurrBook, updatedPrice)
    renderBooks()
    hideUpdateModal()
  } else {
    hideUpdateModal()
    return
  }
}

function onOpenUpdateModal(bookId) {
  const elUpdateModal = document.querySelector('.update-book')
  elUpdateModal.classList.add('slide-top')

  gCurrBook = bookId
}

function hideUpdateModal() {
  const elUpdateModal = document.querySelector('.update-book')
  var updatedPrice = document.querySelector('.update-book input[name="price"]')
  updatedPrice.value = ''
  elUpdateModal.classList.remove('slide-top')
  gCurrBook = null
}

function onReadBook(BookId) {
  const book = getBookById(BookId)

  renderBookModal(book)
  var elTable = document.querySelector('table')
  elTable.style.opacity = '0.5'
  var elAddBtn = document.querySelector('.add-btn')
  elAddBtn.style.opacity = '0.5'
  var elModal = document.querySelector('.modal-entire')
  elModal.classList.add('slide-right')
}

function onSortBy(el, sortBy) {
  const elSorts = document.querySelectorAll('th')
  elSorts.forEach((btn) => btn.classList.remove('onSort'))
  el.classList.add('onSort')
  setBookSort(sortBy)

  renderBooks()
}

function onCloseModal() {
  var elTable = document.querySelector('table')
  elTable.style.opacity = '1'
  var elAddBtn = document.querySelector('.add-btn')
  elAddBtn.style.opacity = '1'
  var elModal = document.querySelector('.modal-entire')
  elModal.classList.remove('slide-right')
}

function onRateChange(BookId, rate) {
  const book = setRateChange(BookId, rate)
  const rating = book.rate
  const elRating = document.querySelector('.rating-container span')
  elRating.innerText = rating
  renderBooks()
}
