const formulario = document.getElementById('formulario');

const validarCantidad = () => {

    const expRegularContidad = /^\d+(\.\d+)?$/;

    const inputCantidad = formulario.cantidad;

    if (expRegularContidad.test(inputCantidad.value)) {

        inputCantidad.classList.remove('formulario__input--error')
        return true;
    } else {
        inputCantidad.classList.add('formulario__input--error')
        return false;
    }
}

export default validarCantidad;