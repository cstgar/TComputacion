# Teoría de la Computación
## Repo con prácticas de Teoría de la Computación:

### 📝 Práctica 6: Autómatas de Pila 🚀


### Descripción
Esta práctica consiste en el desarrollo de un **validador de expresiones aritméticas** utilizando **autómatas de pila (PDA, Pushdown Automaton)**. El programa permite validar:

- El uso correcto de **paréntesis** en expresiones aritméticas.
- La existencia de **números enteros positivos** y operadores aritméticos (`+`, `-`, `*`, `/`).
- La detección de **errores de paréntesis**, indicando la posición exacta donde ocurre el problema.
- El seguimiento de los **estados de la pila** paso a paso.

La práctica se implementa en **HTML, CSS y JavaScript**, mostrando tanto la entrada de la expresión como los resultados de la validación en tiempo real.

---

### Funcionalidades

1. **Validación de expresión**
   - Detecta caracteres inválidos que no sean números, operadores o paréntesis.
   - Maneja espacios sin afectar la validación.

2. **Detección de errores de paréntesis**
   - Paréntesis de cierre sin apertura.
   - Paréntesis de apertura sin cierre.
   - Indica la posición exacta en la cadena donde ocurre el error.

3. **Tokenización**
   - Divide la expresión en **tokens**: números, operadores y paréntesis.
   - Muestra la posición de cada token en la cadena original.

4. **Registro de estados de la pila**
   - Muestra paso a paso cómo se modifican los estados de la pila.
   - Permite visualizar cómo el autómata maneja el anidamiento de los paréntesis.

5. **Interfaz de usuario**
   - Campo de entrada para la expresión aritmética.
   - Área de salida para tokens y estados de la pila.
   - Mensajes claros de validación y errores.
   - Botón de **limpiar** para reiniciar la práctica.

---

## Tecnologías

- **HTML**: Formulario de entrada y área de salida.
- **CSS**: Estilos básicos para mejorar la visualización.
- **JavaScript**: Lógica del autómata de pila, validación y manejo de eventos.

---

## Cómo usar
Aqui se muestra el link donde esta publicado el proyecto:

[Repositorio de la práctica](https://leafy-mooncake-0f747e.netlify.app/)

De otra manera localmente se puede acceder con los siguientes pasos:
1. Abrir el archivo `index.html` en un navegador web.
2. Ingresar la expresión aritmética en el campo de texto.
3. Presionar **Validar**:
   - Se mostrarán los tokens con sus posiciones.
   - Se mostrarán los estados de la pila paso a paso.
   - Se indicará si la expresión es correcta o si hay errores.
4. Para reiniciar, presionar el botón **Limpiar**.

---

## Ejemplos de entrada

- Correcta: `(12+7)*(3-1)-(56)`
- Error de cierre: `(12+7*(3-1)-(56)))`
- Error de apertura: `12+7)*3`
- Expresión compleja: `((15+23)*(7-(3+2*5))+((12/4)-6)*(8+9)-((7+3)*2))`

---

#### Autor
**Cinthia Karen García**  
Práctica 6 – Autómatas de Pila  
[Fecha: 2025]