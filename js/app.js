document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  //CHANGING BUTTON ON HOVER STYLE DEPENDING ON DISABLED STATUS
  btnSubmit.addEventListener("mouseover", toggleSubmitStyles);
  btnSubmit.addEventListener("mouseout", function (e) {
    e.preventDefault();
  });

  //SEND EMAIL, Showing spinner with simulated delay 3s
  //Submit button is only enabled when all fields are filled / no validation error
  function enviarEmail(e) {
    e.preventDefault();
    //Show spinner
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");
    //After 3s, hide spinner
    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      //reinit the form - clear all fields
      resetFormulario();

      //Create a success alert
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      //Create a error alert
      const alertaError = document.createElement("P");
      alertaError.classList.add(
        "bg-red-600",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaError.textContent = "Error al enviar el mensaje";

      if (randomFailSuccess()) {
        //Append the alert to the form
        formulario.appendChild(alertaExito);
      } else {
        //Append the alert to the form
        formulario.appendChild(alertaError);
      }
      //Showing the "message sent successfully" alert for 3s, then remove it
      setTimeout(() => {
        if (formulario.hasChildNodes(alertaExito)) {
          alertaExito.remove();
        }
        alertaError.remove();
      }, 3000);
    }, 3000);
  }

  //VALIDATE, the event is passed as a parameter automatically
  function validar(e) {
    
    //GENERAL FIELDS EMPTY Check
    if (e.target.value.trim() === "") {
      //we pass the name of the element we are in(input.id) and parent element(input.parentElement)
      mostrarAlerta(
        `El Campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      //RESET THE GENERAL FIELD IF IS EMPTY(user deleted)-CLEAR THE VARIABLE
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    //Checking for valid email e-event
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    //Default === no error
    limpiarAlerta(e.target.parentElement);

    //ASSING EMAIL VALUES TO GLOBAL OBJECT
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto de email
    comprobarEmail();
  }

  //SHOW ALERT on dynamically generated paragraph, with message and reference to the parent element
  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "rounded-lg"
    );

    //INJECT ERROR TO THE FORM (REFERENCE TO THE PARENT ELEMENT)
    referencia.appendChild(error);
  }

  //CLEAR ALERT
  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  //VALIDATE EMAIL + REGEX
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email); //true/false
    return resultado;
  }

  //EMAIL CHECK = SUBMIT BUTTON DISABLED/ENABLED
  function comprobarEmail() {
    //Object.keys(email)
    //Object.values(email)

    //verification if email isnt empty
    //desactivation of submit button
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    //activation of submit button if email is empty
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }
  //RESET FORM
  function resetFormulario() {
    // reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    //test the mail, so the data in variable is reincialized == empty
    comprobarEmail();
  }
  //TOGGLE SUBMIT BUTTON STYLES
  function toggleSubmitStyles(e) {
    e.preventDefault();
    if (btnSubmit.getAttribute("disabled") !== null) {
      // let disabledBtn = "submit is disabled";
      // console.log(disabledBtn);
      btnSubmit.style = "cursor: not-allowed;";
    } else {
      btnSubmit.style = "cursor: pointer;";
    }
  }
  function randomFailSuccess() {
    return Math.floor(Math.random() * 2) === 0 ? true : false;
  }
});
