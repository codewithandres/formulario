const formulario = document.getElementById('formulario');

const validarcorreo = () => {

    const expRegularCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const inputcorreo = formulario['correo-receptor'];

    if (expRegularCorreo.test(inputcorreo.value)) {

        inputcorreo.classList.remove('formulario__input--error')
        return true;
    } else {
        inputcorreo.classList.add('formulario__input--error')
        return false;
    }
}

export default validarcorreo;