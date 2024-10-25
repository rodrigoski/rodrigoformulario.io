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