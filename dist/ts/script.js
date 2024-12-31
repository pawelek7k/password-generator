"use strict";
var passwordList = document.querySelector('.password-list');
var lengthSlider = document.getElementById('length');
var lengthValue = document.getElementById('length-value');
var submitButton = document.getElementById('submit');
var incrementButtons = document.querySelectorAll('.increment');
var decrementButtons = document.querySelectorAll('.decrement');
var options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
    length: parseInt(lengthSlider.value, 10),
};
lengthSlider.addEventListener('input', function () {
    options.length = parseInt(lengthSlider.value, 10);
    lengthValue.textContent = lengthSlider.value;
});
var generatePassword = function (options) {
    var charCategories = [
        { chars: '0123456789', count: options.digits },
        { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', count: options.capitals },
        { chars: '!@#$%^&*()_+[]{}|;:,.<>?', count: options.symbols },
        { chars: 'abcdefghijklmnopqrstuvwxyz', count: options.length - (options.digits + options.capitals + options.symbols) },
    ];
    var password = '';
    var characterPool = '';
    charCategories.forEach(function (_a) {
        var chars = _a.chars, count = _a.count;
        for (var i = 0; i < count; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        characterPool += chars;
    });
    password = shuffleString(password);
    while (password.length < options.length) {
        password += characterPool[Math.floor(Math.random() * characterPool.length)];
    }
    return shuffleString(password);
};
var shuffleString = function (str) {
    var _a;
    var arr = str.split('');
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    }
    return arr.join('');
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
        if (type) {
            options[type]++;
            updateOptionUI(type);
            validateOptions();
        }
    });
});
decrementButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var type = button.getAttribute('data-type');
        if (type && options[type] > 0) {
            options[type]--;
            updateOptionUI(type);
            validateOptions();
        }
    });
});
var updateOptionUI = function (type) {
    var optionDiv = document.querySelector(".".concat(type));
    var countDisplay = optionDiv.querySelector('.count');
    if (countDisplay) {
        countDisplay.textContent = options[type].toString();
    }
};
var validateOptions = function () {
    var totalSelected = options.digits + options.capitals + options.symbols;
    if (totalSelected > options.length) {
        alert('Suma cyfr, wielkich liter i symboli przekracza długość hasła.');
        options.length = totalSelected;
        lengthSlider.value = options.length.toString();
        lengthValue.textContent = options.length.toString();
    }
};
submitButton.addEventListener('click', function () {
    var totalSelected = options.digits + options.capitals + options.symbols;
    if (totalSelected > options.length) {
        alert('Suma cyfr, wielkich liter i symboli przekracza długość hasła.');
        return;
    }
    var password = generatePassword(options);
    addPasswordToList(password);
});
var initializeUI = function () {
    ['digits', 'capitals', 'symbols'].forEach(function (type) {
        var optionDiv = document.querySelector(".".concat(type));
        var countDisplay = document.createElement('span');
        countDisplay.className = 'count';
        countDisplay.textContent = options[type].toString();
        optionDiv.appendChild(countDisplay);
    });
    lengthValue.textContent = lengthSlider.value;
};
initializeUI();
