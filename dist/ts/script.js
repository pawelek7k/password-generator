"use strict";
var options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
};
var passwordListContainer = document.querySelector('.password-list-container');
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
