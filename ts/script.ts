let options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
};

const passwordListContainer = document.querySelector('.password-list-container') as HTMLElement;
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