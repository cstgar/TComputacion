// Formulario para la parte de las expresiones regulares y validar los campos como Nombre, RFC, Edad etc
// Expresiones regulares
const PATTERNS = {
    nombre: /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{2,50}$/,
    edad: /^(1[89]|[2-9][0-9]|100)$/,
    telefono: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    salario: /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
    rfc: /^([A-ZÑ]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([A-Z\d]{0,3})$/,
    email: /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
}

//Se Define donde esta el formulario
const FORM = document.getElementById('miForm');

//Se define donde esta la sección donde se mostrará el status
const STATUS_BOX = document.getElementById('status');

const validacionCampo = (campo) => {
    //referencia al atributo name de cada input
    const NAME = campo.getAttribute('name');
    //referencia al valor en cada input sin espacios
    const VAL = campo.value.trim();
    //referencia al valor donde esta el div correspondiente al error
    //buscando por el atributo name
    const ERROR1 = document.getElementById('error-' + NAME);
    //Se establece que por default el valor de la sección error en cada campo estará vacía
    ERROR1.textContent = '';

    ///Si no hay un patrón para ese name, la función devuelve true (no válida)
    if (!PATTERNS[NAME]) return true;

    //Si el campo required y está vacío muestra un mensaje y retorna false (inválido)
    if (campo.required && VAL === ''){
        ERROR1.textContent = 'Este campo es obligatorio.';
        return false;
    }
    //Esta validacion es para los campos que no son requeridos como obligatorios
    //Si llego a capturar algun opcional, aunque lo dejan vacio sera valido por eso lo pasamos como true
    if (VAL === '') return true;
    
    //Toma el regex de cada campo
    const PAT = PATTERNS[NAME];
    //Usa test para comprobar, sino pasa entra en el switch y muestra el mensaje de error segun el campo
    if (!PAT.test(VAL)) {

        switch(NAME){

            case 'nombre': ERROR1.textContent = 'Nombre inválido. Usa solo letras y espacios (2-50).';
                break;
            case 'edad': ERROR1.textContent = 'Edad inválida. Solo mayores de edad. Ingresa un número entre 18 y 100';
                break;
            case 'telefono': ERROR1.textContent = 'Teléfono inválido. Formato: (DDD)-DDD-DD-DD';
                break;
            case 'salario': ERROR1.textContent = 'Salario inválido. Usa separadores de miles con coma y hasta 2 decimales.'; 
                break;
            case 'rfc': ERROR1.textContent = 'RFC inválido. Debe tener 3 o 4 letras, 6 dígitos de fecha y opcionalmente 3 caracteres de homoclave.';
                break;
            case 'email': ERROR1.textContent = 'Correo inválido. Usa solo letras, números, puntos, guiones y guion bajo en el usuario. Ejemplo: usuario@dominio.com.mx';
                break;
            default: ERROR1.textContent = 'Valor inválido.'
        }
        return false;
    }

    return true;

};

// Validar cada campo mientras el usuario escribe
FORM.addEventListener('input', (e) => {
    validacionCampo(e.target);
});

// Validar todos los campos al enviar el formulario
FORM.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se envíe de inmediato
    let todosValidos = true;
    FORM.querySelectorAll('input').forEach(campo => {
        if (!validacionCampo(campo)) todosValidos = false;
    });

    if (todosValidos) {
        STATUS_BOX.style.display = 'block';
        STATUS_BOX.textContent = 'Formulario enviado correctamente!';
    } else {
        STATUS_BOX.style.display = 'block';
        STATUS_BOX.textContent = 'Hay errores en el formulario.';
    }
});

//agregar funcion de botor limpiar
const RESET_BTN = document.getElementById('resetBtn');

RESET_BTN.addEventListener('click', () => {
    FORM.reset(); // Limpia campos

    // Limpiar errores
    FORM.querySelectorAll('.error').forEach(errorDiv => {
        errorDiv.textContent = '';
    });

    // Ocultar status
    STATUS_BOX.style.display = 'none';
    STATUS_BOX.textContent = '';
});