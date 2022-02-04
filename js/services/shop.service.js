'use strict'
const STORAGE_KEY = 'booksDB'
var gSortBy = 'bookName'
var gBooks

//!always update storage here
function getBooksForDisplay() {
  if (gSortBy !== 'bookName') {
    gBooks.sort((a, b) => a[gSortBy] - b[gSortBy])
  }
  gBooks.sort((a, b) => (a[gSortBy] < b[gSortBy] ? -1 : 1))
  return gBooks
}

function deleteBook(BookId) {
  //!done
  var id = gBooks.findIndex((book) => book.id === BookId)
  gBooks.splice(id, 1)
  console.log(gBooks)
  _saveBooksToStorage()
}

function addBook(bookName, price, url) {
  //!done
  gBooks.push(_createBook(bookName, price, url))
  _saveBooksToStorage()
  console.log(gBooks)
}

function updateBook(BookId, updatedPrice) {
  //!done

  const book = gBooks.find((book) => book.id === BookId)
  book.price = +updatedPrice
  _saveBooksToStorage()
}

function _createBook(bookName, price, imgUrl, rate = 5) {
  return {
    id: makeId(),
    bookName,
    price: price,
    imgUrl,
    rate,
  }
}

_createBooks()
function _createBooks() {
  gBooks = loadFromStorage(STORAGE_KEY)
  if (!gBooks || !gBooks.length) {
    gBooks = [
      _createBook('aaaa', 101, imgUrls[0], 1),
      _createBook('bbbb', 103, imgUrls[1], 7),
      _createBook('cccc', 102, imgUrls[2], 5),
      _createBook('dddd', 200, imgUrls[3], 4),
      _createBook('eeee', 70, imgUrls[4], 2),
      _createBook('ffff', 30, imgUrls[5], 7),
    ]
    _saveBooksToStorage(STORAGE_KEY, gBooks)
  }
}

function getBookById(BookId) {
  const book = gBooks.find((book) => book.id === BookId)
  return book
}

function setRateChange(bookId, rate) {
  const book = gBooks.find((book) => book.id === bookId)
  book.rate += rate
  _saveBooksToStorage()
  return book
}

function setBookSort(sort) {
  gSortBy = sort
  getBooksForDisplay()
  return
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}
