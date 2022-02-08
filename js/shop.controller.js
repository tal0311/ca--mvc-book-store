'use strict'

var gCurrBook

function initShop() {
  renderBooks()
}

function renderBooks() {
  const books = getBooksForDisplay()

  var strHTMLs = books.map(
    //better add the change rating inside the buttons td
    (book) => `
   <tr class="fs-5 text">
          <td name="bookId">${book.id}</td>
          <td >
          <img src="${book.imgUrl}"/>
          </td>
          <td>${book.price}</td>
          <td>${book.bookName}</td>
          <td class="actions-container">
            <button data-trans="read" class="btn btn-outline-primary read-btn" onclick="onReadBook('${book.id}')">read</button>
            <button data-trans="update" class="my-2 btn btn-outline-warning update-btn" onclick="onOpenUpdateModal('${book.id}')">
              update
            </button>
            <button data-trans="remove" class="btn btn-outline-danger delete-btn" onclick="onDeleteBook('${book.id}')">
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

    <article class=" card book-modal">
      <button data-trans="info" onclick="onCloseModal()">close Summery</button>
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
           }' , 1)">+</button> <span class="fs-3 by-dark">${book.rate}</span>
            <button class="btn rate-btn minus" onclick="onRateChange('${
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

function onChangeLang(value) {
  var lang = setLang(value)
  changePageDirection(lang)
  doTrans()
}

function changePageDirection(lang) {
  console.log(lang)
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
}

function doTrans() {
  var itemsToTrans = document.querySelectorAll('[data-trans]')
  itemsToTrans.forEach((item) => {
    var key = item.dataset.trans

    var txt = getTrans(key)

    item.innerText = txt
    item.placeholder = txt
  })
}

//!always rerender here if you can not render here its not spouse to be here
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

    bookName.innerText = ''
    price.innerText = ''
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

  if (updatedPrice && updatedPrice > 0) {
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
  // var elAddBtn = document.querySelector('.add-btn')
  // elAddBtn.style.opacity = '0.5'
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
  // var elAddBtn = document.querySelector('.add-btn')
  // elAddBtn.style.opacity = '1'
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

// function setCurrency(num) {
//   if (gLang === 'he') {
//     return new Intl.NumberFormat('he-IL', {
//       style: 'currency',
//       currency: 'ILS',
//     }).format(num)
//   } else {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'usd',
//     }).format(num)
//   }
// }
