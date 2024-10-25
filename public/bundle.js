'use strict';

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
    // Aceptamos cualquier dígito (0-9), y un punto con decimales (opcional)
    const expRegCantidad = /^\d+(\.\d+)?$/;

    // Obtenemos el input cantidad
    const inputCantidad = formulario$3.cantidad;

    if (expRegCantidad.test(inputCantidad.value)) {
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }
};

const formulario$2 = document.getElementById('formulario');

const validarNombre = () => {
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputNombre = formulario$2['nombre-receptor'];

    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }
};

const formulario$1 = document.getElementById('formulario');

const validarCorreo = () => {
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const inputCorreo = formulario$1['correo-receptor'];

    if (expRegCorreo.test(inputCorreo.value)) {
        inputCorreo.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    }
};

const marcarPaso = (paso) => {
    document
    .querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add('linea-pasos__paso-check--checked');

};

const siguientePaso = () => {
    // Creamos un arreglo con los pasos.
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

    // Obtenemos el paso activo.
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

    // Obtenemos el index del paso activo.
    const indexPasoActivo = pasos.indexOf(pasoActivo);

    if (indexPasoActivo < pasos.length - 1) {
        // Eliminamos la clase de paso activo.
        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');
        
        //Ponemos la clase de paso activa del elemento
        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

        const id = pasos[indexPasoActivo + 1].dataset.paso;
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });
    }
};

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
             formulario.classList.add('formulario--hidden');
             document.getElementById('alerta').classList.add('alerta--active');
        }, 4000);
    }
    
});

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

document.addEventListener("DOMContentLoaded", () => {
    // Cambiar el fondo de la página y estilizar el formulario
    document.body.style.backgroundColor = "#111"; // Fondo minimalista oscuro
    document.body.style.color = "#f5f5f5";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
  
    // Seleccionar contenedor del formulario y añadir estilos
    const formContainer = document.querySelector(".contenedor");
    formContainer.style.backgroundColor = "#222";
    formContainer.style.borderRadius = "8px";
    formContainer.style.padding = "20px";
    formContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    formContainer.style.width = "90%";
    formContainer.style.maxWidth = "400px";
  
    // Estilizar el botón de enviar
    const submitButton = document.getElementById("btnEnviar");
    submitButton.style.backgroundColor = "#1a73e8";
    submitButton.style.color = "#fff";
    submitButton.style.border = "none";
    submitButton.style.padding = "12px 20px";
    submitButton.style.borderRadius = "5px";
    submitButton.style.cursor = "pointer";
    submitButton.style.fontSize = "18px";
    submitButton.style.transition = "background-color 0.3s ease";
    
    // Cambiar color al pasar el cursor por el botón
    submitButton.addEventListener("mouseover", () => {
      submitButton.style.backgroundColor = "#155bb5";
    });
    submitButton.addEventListener("mouseout", () => {
      submitButton.style.backgroundColor = "#1a73e8";
    });
  
    // Crear la sección de métodos de pago
    const paymentSection = document.createElement("div");
    paymentSection.style.marginTop = "20px";
    paymentSection.style.textAlign = "center";
    paymentSection.style.color = "#f5f5f5";
  
    // Crear título de la sección
    const paymentTitle = document.createElement("h3");
    paymentTitle.textContent = "Estos son los métodos de pago que aceptamos";
    paymentTitle.style.marginBottom = "10px";
    paymentTitle.style.fontSize = "20px";
  
    // Crear contenedor de logos de tarjetas
    const paymentLogos = document.createElement("div");
    paymentLogos.style.display = "flex";
    paymentLogos.style.justifyContent = "center";
    paymentLogos.style.gap = "10px";
  
    // Lista de URLs para las imágenes de las tarjetas
    const cardImages = [
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
    ];
  
    // Crear y añadir cada logo de tarjeta
    cardImages.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Tarjeta de crédito/débito";
      img.style.width = "50px";
      img.style.height = "auto";
      paymentLogos.appendChild(img);
    });
  
    // Agregar título y logos al contenedor de métodos de pago
    paymentSection.appendChild(paymentTitle);
    paymentSection.appendChild(paymentLogos);
  
    // Insertar la sección de métodos de pago después del formulario
    formContainer.insertAdjacentElement("afterend", paymentSection);
  });
//# sourceMappingURL=bundle.js.map
