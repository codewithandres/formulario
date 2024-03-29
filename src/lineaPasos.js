import validarCantidad from "./validaciones/validar-cantidad";
import validarcorreo from "./validaciones/validar-correo";
import validarNombre from "./validaciones/validar-nombre";

const linea = document.getElementById('linea-pasos');

linea.addEventListener('click', e => {
    if (!e.target.closest('.linea-pasos__paso')) return;

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    if (pasoActual === 'cantidad') if (!validarCantidad()) return;
    if (pasoActual === 'datos') if (!validarNombre() || !validarcorreo()) return;

    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    if (pasoANavegar.querySelector('.linea-pasos__paso-check--checked')) {

        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');

        const id = pasoANavegar.dataset.paso;

        linea.querySelector(` [data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');

        const btnFormulario = document.querySelector('#formulario__btn');
        btnFormulario.querySelector('span').innerText = 'Siguiente';

        btnFormulario.querySelector(' [data-icono="banco"] ').classList.remove('formulario__btn-contenedor-icono--active');

        btnFormulario.querySelector(' [data-icono="siguiente"] ').classList.add('formulario__btn-contenedor-icono--active');
        // quitando las clase de disbale
        btnFormulario.classList.remove('formulario__btn--disable');

        // navgamos al paso
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({ inline: 'start', behavior: 'smooth' })

    }


});