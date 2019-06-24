/* eslint-disable no-unused-vars */
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

function changePassword() {
  $('#changePasswordForm').prop('hidden', false)
}

function cancelChangePassword() {
  $('#changePasswordForm').prop('hidden', true)
}

function lockAccount(id) {
  $.post('localhost:3001/users/lock/' + id)
  window.location.reload()
}

function unlockAccount(id) {
  $.post('localhost:3001/users/unlock/' + id)
  window.location.reload()
}

function changeUserInfo() {
  $('#userName').prop('disabled', false)
  $('#userPhone').prop('disabled', false)
  $('form input:radio').prop('disabled', false)
  $('#confirmChangeUserInfo').prop('hidden', false)
  $('#changeUserInfo').prop('hidden', true)
}

function quitUserInfo() {
  $('#userName').prop('disabled', true)
  $('#userPhone').prop('disabled', true)
  $('form input:radio').prop('disabled', true)
  $('#confirmChangeUserInfo').prop('hidden', true)
  $('#changeUserInfo').prop('hidden', false)
}
