import marcarpaso from "./marcar-paso";
import siguientePaso from "./siguiente-paso";
import validarCantidad from "./validaciones/validar-cantidad";
import validarNombre from "./validaciones/validar-nombre";
import validarcorreo from "./validaciones/validar-correo";

const formulario = document.getElementById('formulario');

formulario.addEventListener('keyup', e => {

    if (e.target.tagName === 'INPUT') {

        if (e.target.id === 'cantidad') {
            validarCantidad()
        } else if (e.target.id === 'nombre-receptor') {
            validarNombre();
        } else if (e.target.id === 'correo-receptor') {
            validarcorreo();
        }

    }

});

const btnFormulario = document.getElementById('formulario__btn');

btnFormulario.addEventListener('click', e => {
    e.preventDefault();

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    if (pasoActual === 'cantidad') {
        if (validarCantidad()) {
            marcarpaso('cantidad')
            siguientePaso();
        };

    } else if (pasoActual === 'datos') {
        if (validarNombre() && validarcorreo()) {
            marcarpaso('datos')
            siguientePaso();
        };
    } else if (pasoActual === 'metodo') {

        marcarpaso('metodo');

        const opciones = { style: 'currency', currency: 'COP' };

        const formatoMoneda = new Intl.NumberFormat('es-CO', opciones);

        document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);
        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

        btnFormulario.querySelector('span').innerText = 'Trasferir...';
        btnFormulario.classList.add('formulario__btn--disabled');

        btnFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');

        btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();


        setTimeout(() => {
            btnFormulario.classList.remove('formulario__btn--disabled');
        }, 4000);
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')) {

        // peticion del servidor

        // _-____--__--___
        btnFormulario.querySelector('span').innerText = 'Trasferiendo';

        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(() => {
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
        console.log('ejecutandpo');
    }
});