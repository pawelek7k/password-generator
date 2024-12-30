let options = {
    digits: 0,
    capitals: 0,
    symbols: 0,
};

const passwordListContainer = document.querySelector('.password-list-container') as HTMLElement;
const incrementButtons = document.querySelectorAll('.increment') as NodeListOf<HTMLButtonElement>;
const decrementButtons = document.querySelectorAll('.decrement') as NodeListOf<HTMLButtonElement>;