let input = document.querySelector('.input');
let display = document.querySelector('.output');
let refresh = document.querySelector('.refresh');
let add = document.querySelector('.add');
let sum = 0;
let increment = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
    increment = Number(input.value);
    sum+=increment;
    display.innerText = sum;
}
});

add.addEventListener ('click', () => {
    increment = Number(input.value);
    sum+=increment;
    display.innerText = sum;
})

refresh.addEventListener ('click', () => {
    sum = 0;
    display.innerText = 0;
});
