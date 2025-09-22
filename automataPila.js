// Formulario para la parte de las expresiones aritméticas

// Expresión regular para tokens válidos:
const PATTERNS = {
    // Validación general: solo números, operadores, paréntesis y espacios
    expresion: /^[0-9()+\-*/]+$/,
    // Tokenización: números (\d+), operadores, paréntesis
    token: /\d+|[()+\-*/]/g
};

//Se Define donde esta el formulario
const FORM = document.getElementById('miForm');

//Se define donde esta la sección donde se mostrará el status
const STATUS_BOX = document.getElementById('status');

//Se define donde esta la seccion de salida
const OUTPUT = document.getElementById('output');

//boton de limpiar
const RESET_BTN = document.getElementById('resetBtn');

//Validar la entrada del usuario
const validarExpresion = (expresion) => {
    let pila = [];
    let tokensConPos = [];
    let pos = 0; // posición real en la cadena original
    let pilaLog = []; // registrar estados de la pila
    let lastIndex = 0; // posición donde buscamos el siguiente token

    // Tokenizar con posiciones
    const TOKENS = expresion.match(PATTERNS.token);

    for (let token of TOKENS) {
        // Encontrar la posición exacta del token en la cadena original
        pos = expresion.indexOf(token, lastIndex);
        lastIndex = pos + token.length;
        let accion = "";

        if (token === "(") {
            pila.push({ char: "(", pos });
            accion = "se identifica ( → SI va a la pila";
        } else if (token === ")") {
            if (pila.length === 0) {
                // Guardamos el token antes de devolver el error
                tokensConPos.push({ token, pos });
                accion = "se identifica ) → error, sin paréntesis de apertura";
                pilaLog.push({ estado: [...pila], accion });
                return {
                    valido: false,
                    mensaje: `Error: paréntesis de cierre sin apertura en posición ${pos + 1}`,
                    tokensConPos,
                    pilaLog
                };
            }
            pila.pop();
            accion = "se identifica ) → ejecuta POP, se quita paréntesis en la pila";
        } else if (!isNaN(token)) {
            accion = `se identifica ${token} → número, no entra en la pila`;
        } else {
            accion = `se identifica ${token} → operador, no entra en la pila`;
        }

        // Guardar token con índice y posición real
        tokensConPos.push({ token, pos });

        // Registrar estado de la pila
        pilaLog.push({ estado: [...pila], accion });
    }

    if (pila.length > 0) {
        const primerAbierto = pila[0]; // el primer paréntesis sin cerrar
        return {
            valido: false,
            mensaje: `Error: falta cerrar paréntesis abierto en posición ${primerAbierto.pos + 1}`,
            tokensConPos,
            pilaLog
        };
    }

    return {
        valido: true,
        mensaje: "El uso de paréntesis es correcto",
        tokensConPos,
        pilaLog
    };
};


// Manejar enviar
FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    OUTPUT.textContent = "";
    STATUS_BOX.style.display = "block";

    const expresion = document.getElementById('expresion').value.trim();

    // Validar campo vacío
    if (expresion === "") {
        STATUS_BOX.textContent = "Expresión vacía o inválida";
        return;
    }

    // Validar caracteres permitidos
    if (!PATTERNS.expresion.test(expresion)) {
        STATUS_BOX.textContent = "Error: Caracter no permitido en la expresión.";
        return;
    }

    const resultado = validarExpresion(expresion);

    // Mostrar tokens en salida con índice y posición real
    resultado.tokensConPos.forEach((tk, i) => {
        OUTPUT.textContent += `Token ${i + 1} --->> ${tk.token}  |--posición ${tk.pos + 1} en la cadena--|\n`;
    });

    // Mostrar estados de la pila
    OUTPUT.textContent += "\n\nEstados de la pila paso a paso:\n\n";
    resultado.pilaLog.forEach((estado, i) => {
        const pilaStr = estado.estado.map(p => p.char).join(", ");
        OUTPUT.textContent += `Paso ${i + 1}: [${pilaStr}] → ${estado.accion}\n`;
    });

    // Mostrar estado final
    STATUS_BOX.textContent = resultado.mensaje;
});

// Botón limpiar
RESET_BTN.addEventListener('click', () => {
    FORM.reset();
    OUTPUT.textContent = "";
    STATUS_BOX.style.display = "none";
    STATUS_BOX.textContent = "";
});
