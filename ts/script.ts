let options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
};

const passwordList = document.querySelector('.password-list') as HTMLElement;
const lengthValue = document.getElementById('length-value') as HTMLElement;
const submitButton = document.getElementById('submit') as HTMLButtonElement;

const incrementButtons = document.querySelectorAll('.increment') as NodeListOf<HTMLButtonElement>;
const decrementButtons = document.querySelectorAll('.decrement') as NodeListOf<HTMLButtonElement>;

const genereatePassword = (options: { digits: number; capitals: number; symbols: number; }): string => {
    const digits = '0123456789';
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let password = '';
    let base = 'abcdefghijklmnopqrstuvwxyz';

    if (options.digits > 0) base += digits;
    if (options.capitals > 0) base += capitals;
    if (options.symbols > 0) base += symbols;

    const length = 6;

    for (let i = 0; i < length; i++) {
        password += base[Math.floor(Math.random() * base.length)]
    }

    return password;
}

const addPasswordToList = (password: string) => {
    const passwordLi = document.createElement('li');
    passwordLi.className = 'password-item';
    passwordLi.textContent = password;
    passwordList.appendChild(passwordLi);
}

incrementButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        if (type && options[type as keyof typeof options] !== undefined) {
            options[type as keyof typeof options]++;
        }
    });
});

decrementButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        if (type && options[type as keyof typeof options] > 0) {
            options[type as keyof typeof options]--;
        }
    });
});