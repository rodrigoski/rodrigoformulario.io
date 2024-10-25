import validarCantidad from "./validaciones/validacionCantidad";
import validarCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";



const linea = document.getElementById('linea-pasos');
linea.addEventListener('click', (e) => {
    if(!e.target.closest('.linea-pasos__paso'))return ;

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    
    //Validamos el campo actual.
    if(pasoActual === 'cantidad'){
       if(!validarCantidad()) return false;
    } else if (pasoActual === 'datos'){
        if (!validarNombre() || !validarCorreo ()) return;
    } 
    
    //Obtenemos el paso a navegar
    const pasoANavegar = e.target.closest('.linea-pasos__paso');
    
    //Comprobamos si el paso tiene el icono de la paloma
    //Solo se quiere dar click en los iconos que tengan la paloma
    if(pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');
    
        //Obtenemos el identificador del paso a navegar
        const id = pasoANavegar.dataset.paso;
        
        // Agregamos la clase activa al nuevo paso
        linea.querySelector(`[data-paso="${id}"] span`) .classList.add('linea-pasos__paso-check--active');
        
        //Navegamos al paso
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth'
          });

          const btnFormulario = document.querySelector('#formulario__btn');
          btnFormulario.querySelector('span').innerText = 'Siguiente';

          btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');
          btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

          btnFormulario.classList.remove('formulario__btn--disabled');

    }
        
});
