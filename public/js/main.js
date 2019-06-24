/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
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

function changeAccountInfo() {
  $('form input:text').prop('disabled', false)
  $('#username').prop('disabled', true)
  $('form input:radio').prop('disabled', false)
  $('#email').prop('disabled', false)
  $('#confirmChangeAccountInfo').prop('hidden', false)
  $('#changeAccountInfo').prop('hidden', true)
}

function quitAccountInfo() {
  $('form input:text').prop('disabled', true)
  $('#username').prop('disabled', true)
  $('form input:radio').prop('disabled', true)
  $('#email').prop('disabled', true)
  $('#confirmChangeAccountInfo').prop('hidden', true)
  $('#changeAccountInfo').prop('hidden', false)
}
