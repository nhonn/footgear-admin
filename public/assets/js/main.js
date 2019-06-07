/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
$(document).ready(function($) {
  'use strict'
  ;[].slice
    .call(document.querySelectorAll('select.cs-select'))
    .forEach(function(el) {
      new SelectFx(el)
    })

  $('.selectpicker').selectpicker

  $('#menuToggle').on('click', function(event) {
    $('body').toggleClass('open')
  })

  $('.search-trigger').on('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    $('.search-trigger')
      .parent('.header-left')
      .addClass('open')
  })

  $('.search-close').on('click', function(event) {
    event.preventDefault()
    event.stopPropagation()
    $('.search-trigger')
      .parent('.header-left')
      .removeClass('open')
  })
})
