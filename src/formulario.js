import validarCantidad from "./validaciones/validacionCantidad";
import validarNombre from "./validaciones/validarNombre";
import validarCorreo from "./validaciones/validarCorreo";
import marcarPaso from "./marcarPaso";
import siguientePaso from "./siguientePaso";

const formulario = document.getElementById('formulario');

//Reiniciando scroll para cargar el formulario.
formulario.querySelector('.formulario__body').scrollLeft = 0;

formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id){
            validarCantidad();
        } else if (e.target.id === 'nombre-receptor') {
            validarNombre();
        } else if (e.target.id === 'correo-receptor') {
            validarCorreo();
        }
    } 
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    if(pasoActual === 'cantidad'){
        if(validarCantidad()) {
            marcarPaso('cantidad');
            siguientePaso();
        } 
    } else if(pasoActual === 'datos'){
        if(validarNombre() && validarCorreo()) {
            marcarPaso('datos');
            siguientePaso();
        } 
    } else if (pasoActual === 'metodo'){
        marcarPaso('metodo');

        //Formato moneda
        const opciones = {style: 'currency', currency: 'MXN'};
        const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);

        document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(
            formulario.cantidad.value
        );
        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

        //Cambiamos el texto de btn a transferir

        btnFormulario.querySelector('span').innerHTML = 'Transferir el monto';

        //Agregar la clase que desahabilite el boton
        btnFormulario.classList.add('formulario__btn--disabled');

        //Ocultar el bton de siguiente
        btnFormulario
        .querySelector('[data-icono="siguiente"]')
        .classList.remove('formulario__btn-contenedor-icono--active');

        //Mostrar el icnono del banco
        btnFormulario
        .querySelector('[data-icono="banco"]')
        .classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();

        //Eliminamos la clase disabled despues de 4s
        setTimeout(() => {
            btnFormulario.classList.remove('formulario__btn--disabled');
        }, 4000);
    } else if(pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')) {

        //Cambiamos el btn a 'Transfieriendo monto'
        btnFormulario.querySelector('span').innerText = 'Transfiriendo el monto';
        //Agregar la clase que desabilita el boton
        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(() => {
             formulario.classList.add('formulario--hidden')
             document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
    }
    
});
