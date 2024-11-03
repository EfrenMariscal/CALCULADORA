let history = [];

function appendToDisplay(value) {
    const display = document.getElementById('display');

    // Si el valor es un paréntesis de apertura, agregarlo y también el de cierre
    if (value === '(') {
        display.value += value + ')'; // Agregar paréntesis de cierre automáticamente
    } else {
        display.value += value; // De lo contrario, agregar el valor normal
    }

    display.focus(); // Mantener el foco en el display
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        // Manejar las funciones matemáticas y evitar el error "ErrorMath"
        const result = eval(display.value);
        display.value = result;

        // Agregar operación al historial
        history.push(`${display.value} = ${result}`);
        updateHistory();
    } catch (error) {
        display.value = 'Error'; // Mostrar mensaje de error
        console.error('Calculation error:', error); // Registro del error en la consola
    }
}

function changeCalculator() {
    const normalButtons = document.querySelector('.buttons.normal');
    const scientificButtons = document.querySelector('.buttons.scientific');
    const selectedType = document.getElementById('calcType').value;

    if (selectedType === 'normal') {
        normalButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
        clearDisplay(); // Limpiar la pantalla al cambiar
    } else {
        normalButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
        clearDisplay(); // Limpiar la pantalla al cambiar
    }
}

// Manejar la entrada del teclado
document.addEventListener('keydown', function(event) {
    const display = document.getElementById('display');

    // Comprobar si se presiona una tecla válida
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', 'Enter', 'C', 'Backspace', 'Delete', '(', ')', 'Math.sin', 'Math.cos', 'Math.tan', 'Math.sqrt'];
    if (validKeys.includes(event.key)) {
        if (event.key === 'Enter') {
            calculate(); // Ejecutar cálculo
        } else if (event.key === 'C') {
            clearDisplay(); // Limpiar pantalla
        } else if (event.key === 'Backspace') {
            display.value = display.value.slice(0, -1); // Eliminar último carácter
        } else if (event.key === 'Delete') {
            clearDisplay(); // Limpiar pantalla
        } else {
            appendToDisplay(event.key); // Añadir número u operación
        }
    }
});

// Actualizar el historial de operaciones
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Limpiar historial previo

    // Agregar cada operación al historial
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Añadir funciones matemáticas a la calculadora
function addMathFunction(func) {
    const display = document.getElementById('display');
    display.value += func + '('; // Añadir la función y abrir paréntesis
    display.focus();
}

// Funciones para la calculadora científica
function addSin() {
    addMathFunction('Math.sin');
}

function addCos() {
    addMathFunction('Math.cos');
}

function addTan() {
    addMathFunction('Math.tan');
}

function addSqrt() {
    addMathFunction('Math.sqrt');
}

function addPow() {
    addMathFunction('Math.pow');
}
