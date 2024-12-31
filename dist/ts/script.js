"use strict";
var options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
};
var passwordList = document.querySelector('.password-list');
var incrementButtons = document.querySelectorAll('.increment');
var decrementButtons = document.querySelectorAll('.decrement');
var genereatePassword = function (options) {
    var digits = '0123456789';
    var capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    var password = '';
    var base = 'abcdefghijklmnopqrstuvwxyz';
    if (options.digits > 0)
        base += digits;
    if (options.capitals > 0)
        base += capitals;
    if (options.symbols > 0)
        base += symbols;
    var length = 6;
    for (var i = 0; i < length; i++) {
        password += base[Math.floor(Math.random() * base.length)];
    }
    return password;
};
var addPasswordToList = function (password) {
    var passwordLi = document.createElement('li');
    passwordLi.className = 'password-item';
    passwordLi.textContent = password;
    passwordList.appendChild(passwordLi);
};
incrementButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var type = button.getAttribute('data-type');
        if (type && options[type] !== undefined) {
            options[type]++;
        }
    });
});
decrementButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var type = button.dataset.type;
        if (type && options[type] > 0) {
            options[type]--;
        }
    });
});
