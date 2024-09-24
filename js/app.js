document.addEventListener('DOMContentLoaded', function() {

    let correo = {
        email: "",
        emailCC: "",
        asunto: "",
        mensaje: ""
    }
    
    const inputEmail = document.querySelector('#email')
    const inputEmailCc = document.querySelector('#emailCC')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnBorrar = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    inputEmail.addEventListener('blur', validar)
    inputEmailCc.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)

    btnEnviar.addEventListener('click', enviarFormulario);

    btnBorrar.addEventListener('click', function(e) {
        e.preventDefault();

        //REINICIAR EL OBJETO
        resetFormulario();
    })

    function enviarFormulario(e) {
        e.preventDefault()

        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');

            resetFormulario();

            const mensajeExito = document.createElement('P');
            mensajeExito.classList.add('bg-green-500', 'alert-text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            mensajeExito.textContent = 'Mensaje Enviado con Exito';

            formulario.appendChild(mensajeExito);

            setTimeout(() => {
                mensajeExito.remove();
            }, 3000)

        }, 3000);
    }

    
    //validacion del input
    function validar(e) {
        if (e.target.value.trim() === '' && e.target.id !== "emailCC") {
            mostrarNotificacion(`El campo ${e.target.id} es obligatorio`, 'error');
            correo[e.target.id] = "";
            comprobarEmail();
            return;
        }
    
        // Validar el campo "email" y "emailCC" para que solo acepten correos válidos
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarNotificacion('El email principal no es válido', 'error');
            correo[e.target.id] = "";
            comprobarEmail();
            return;
        }
    
        if (e.target.id === 'emailCC' && !validarEmail(e.target.value)) {
            mostrarNotificacion('El email con copia no es válido', 'error');
            correo[e.target.id] = "";
            comprobarEmail();
            return;
        }

           // Validar que el campo "asunto" no esté vacío
        if (e.target.id === 'asunto' && e.target.value.trim() === '') {
            mostrarNotificacion('El campo Asunto es obligatorio', 'error');
            correo[e.target.id] = "";
            return;
        }
        
        limpiarAlerta(e.target.parentElement);
    
        // Asignar los valores
        correo[e.target.id] = e.target.value.trim().toLowerCase();
    
        comprobarEmail();
    }
    
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const comprueba = regex.test(email)
        return comprueba;
    }

    function comprobarEmail() {
        if (Object.values(correo).includes('')) {
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return
        } 
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    }

    function resetFormulario(){
        correo.email = "",
        correo.asunto = "",
        correo.mensaje = "";


        formulario.reset();
        comprobarEmail();
    }

    function mostrarNotificacion(mensaje, tipo = 'error') {
        const toastContainer = document.getElementById('toast-container');
        
        // Crear la notificación
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        toast.textContent = mensaje;
        
        // Estilos básicos
        toast.style.background = tipo === 'error' ? 'red' : 'green';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.marginBottom = '10px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease-in-out';
        
        // Agregar la notificación al contenedor
        toastContainer.appendChild(toast);
        
        // Mostrar la notificación
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100); // Retraso para que la transición funcione
        
        // Ocultar y eliminar la notificación después de 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500); // Esperar a que la transición termine antes de eliminarla
        }, 3000);
    }
    
    
});

