// Seleção de elementos do DOM
const display = document.querySelector("#display");
const numbers = document.querySelectorAll("[id *= key]");
const operators = document.querySelectorAll("[id *= operator]");

// Variáveis de estado da calculadora
let new_number = true; // Indica se o próximo número digitado deve iniciar um novo valor no display
let operator; // Armazena o operador atual para cálculos
let previous_number; // Guarda o número anterior para realizar operações

// Função para verificar se existe um operador pendente para cálculo
const pending_operator = () => operator !== undefined;

// Função para realizar cálculos baseados no operador selecionado
const calc = () => {
    if (pending_operator()) {
        const current_number = parseFloat(
            display.textContent.replace(",", ".")
        );
        new_number = true;
        switch (operator) {
            case "fa-divide":
                update_display(previous_number / current_number);
                break;
            case "fa-xmark":
                update_display(previous_number * current_number);
                break;
            case "fa-minus":
                update_display(previous_number - current_number);
                break;
            case "fa-plus":
                update_display(previous_number + current_number);
                break;
        }
    }
};

// Função para atualizar o display da calculadora
const update_display = (text) => {
    if (new_number) {
        display.textContent = text.toLocaleString("pt-BR");
        new_number = false;
    } else {
        display.textContent += text.toLocaleString("pt-BR");
    }
};

// Função para inserir número ao pressionar um botão de número
const insert_number = (e) => update_display(e.target.textContent);

// Função para selecionar um operador e preparar para a próxima operação
const select_operator = (e) => {
    if (!new_number) {
        calc();
        new_number = true;
        operator = e.target
            .closest("button")
            .querySelector("i")
            .className.split(" ")[1];
        previous_number = parseFloat(display.textContent.replace(",", "."));
    }
};

// Adiciona evento de clique para cada número e operador
numbers.forEach((number) => number.addEventListener("click", insert_number));
operators.forEach((operator) =>
    operator.addEventListener("click", select_operator)
);

// Funções para manipulação da calculadora: igual, limpar display, limpar tudo, apagar último número, inverter sinal e inserir decimal
const active_equal = () => {
    calc();
    operator = undefined;
};

const clear_display = () => (display.textContent = "");

const clear_calc = () => {
    clear_display();
    operator = undefined;
    new_number = true;
    previous_number = undefined;
};

const remove_last_number = () =>
    (display.textContent = display.textContent.slice(0, -1));

const reverse_signal = () => {
    new_number = true;
    update_display(display.textContent * -1);
};

const insert_decimal = () => {
    if (display.textContent.indexOf(",") === -1) {
        update_display(display.textContent.length > 0 ? "," : "0,");
    }
};

// Adicionando eventos para botões especiais da calculadora
document.getElementById("equals").addEventListener("click", active_equal);
document.getElementById("clearEntry").addEventListener("click", clear_display);
document
    .getElementById("clearCalculation")
    .addEventListener("click", clear_calc);
document
    .getElementById("backspace")
    .addEventListener("click", remove_last_number);
document.getElementById("invert").addEventListener("click", reverse_signal);
document.getElementById("decimal").addEventListener("click", insert_decimal);

// Mapeamento de teclado para operações da calculadora
const keyboard_map = {
    0: "key0",
    1: "key1",
    2: "key2",
    3: "key3",
    4: "key4",
    5: "key5",
    6: "key6",
    7: "key7",
    8: "key8",
    9: "key9",
    "/": "operatorDivide",
    "*": "operatorMultiply",
    "-": "operatorSubtract",
    "+": "operatorAdd",
    "=": "equals",
    Enter: "equals",
    Backspace: "backspace",
    c: "clearEntry",
    Escape: "clearCalculation",
    ",": "decimal",
};

// Função para mapear a entrada do teclado para ações na calculadora
const map_keyboard = (e) => {
    const elementId = keyboard_map[e.key];
    if (elementId) {
        document.getElementById(elementId)?.click();
    }
};

// Adiciona o ouvinte de eventos para capturar teclas pressionadas
document.addEventListener("keydown", map_keyboard);
