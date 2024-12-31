const passwordList = document.querySelector('.password-list') as HTMLElement;
const lengthSlider = document.getElementById('length') as HTMLInputElement;
const lengthValue = document.getElementById('length-value') as HTMLElement;
const submitButton = document.getElementById('submit') as HTMLButtonElement;

let options: { digits: number; capitals: number; symbols: number; length: number };

const initializeUI = () => {
    options = {
        digits: 0,
        capitals: 0,
        symbols: 0,
        length: parseInt(lengthSlider.value, 10),
    };

    ['digits', 'capitals', 'symbols'].forEach((type) => {
        const optionDiv = document.querySelector(`.${type}`) as HTMLElement;
        const countDisplay = document.createElement('span');
        countDisplay.className = 'count';
        countDisplay.textContent = options[type as keyof typeof options].toString();
        optionDiv.appendChild(countDisplay);
    });

    lengthValue.textContent = lengthSlider.value;
};

let sliderTimeout: number | null = null;
lengthSlider.addEventListener('input', () => {
    if (sliderTimeout) clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(() => {
        options.length = parseInt(lengthSlider.value, 10);
        lengthValue.textContent = lengthSlider.value;
        validateOptions();
    }, 200);
});

const generatePassword = (options: { digits: number; capitals: number; symbols: number; length: number }): string => {
    const charCategories = [
        { chars: '0123456789', count: options.digits },
        { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', count: options.capitals },
        { chars: '!@#$%^&*()_+[]{}|;:,.<>?', count: options.symbols },
    ];

    let password = '';
    let characterPool = 'abcdefghijklmnopqrstuvwxyz';

    charCategories.forEach(({ chars, count }) => {
        for (let i = 0; i < count; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        characterPool += chars;
    });

    for (let i = password.length; i < options.length; i++) {
        password += characterPool[Math.floor(Math.random() * characterPool.length)];
    }

    return shuffleString(password);
};

const shuffleString = (str: string): string => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
};

const addPasswordToList = (password: string) => {
    const passwordLi = document.createElement('li');
    passwordLi.className = 'password-item';

    const passwordText = document.createElement('span');
    passwordText.textContent = password;
    passwordLi.appendChild(passwordText);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Usuń';
    removeButton.className = 'remove-password';
    passwordLi.appendChild(removeButton);

    passwordList.appendChild(passwordLi);

    removeButton.addEventListener('click', () => {
        passwordList.removeChild(passwordLi);
    });
};

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('increment') || target.classList.contains('decrement')) {
        const isIncrement = target.classList.contains('increment');
        const type = target.getAttribute('data-type') as keyof typeof options;

        if (type) {
            if (isIncrement) {
                options[type]++;
            } else if (options[type] > 0) {
                options[type]--;
            }
            updateOptionUI(type);
            validateOptions();
        }
    }
});

const updateOptionUI = (type: keyof typeof options) => {
    const optionDiv = document.querySelector(`.${type}`) as HTMLElement;
    const countDisplay = optionDiv.querySelector('.count') as HTMLElement;

    if (countDisplay) {
        countDisplay.textContent = options[type].toString();
    }

    const totalSelected = options.digits + options.capitals + options.symbols;
    if (totalSelected > options.length) {
        options.length = totalSelected;
        lengthSlider.value = options.length.toString();
        lengthValue.textContent = options.length.toString();
        alert('Suma cyfr, wielkich liter i symboli przekracza długość hasła.');
    }
};

const validateOptions = () => {
    const totalSelected = options.digits + options.capitals + options.symbols;
    if (totalSelected > options.length) {
        options.length = totalSelected;
        lengthSlider.value = options.length.toString();
        lengthValue.textContent = options.length.toString();
        alert('Suma cyfr, wielkich liter i symboli przekracza długość hasła.');
    }
};

submitButton.addEventListener('click', () => {
    const totalSelected = options.digits + options.capitals + options.symbols;
    if (totalSelected > options.length) {
        alert('Suma cyfr, wielkich liter i symboli przekracza długość hasła.');
        return;
    }
    const password = generatePassword(options);
    addPasswordToList(password);
});

initializeUI();
