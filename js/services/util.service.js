'use strict'

function makeId(length = 6) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(wordCount = 20) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

// data for random boom url image
const imgUrls = [
  'https://images-na.ssl-images-amazon.com/images/I/71F4+7rk2eL._AC_UL254_SR254,254_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/81SmH2JFABL._AC_UL254_SR254,254_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/911cmGSgcvL._AC_UL127_SR127,127_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/81PNeyIYVfL._AC_UL127_SR127,127_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/91PGeuJ8UTL._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL127_SR127,127_.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/91V3PDO9JBS._UX300__PJku-sticker-v7,TopRight,0,-50_AC_UL127_SR127,127_.jpg',
]
