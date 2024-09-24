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
        // console.log(e.target.parentElement)
        if(e.target.value.trim() === '' && e.target.id !== "emailCC") {
            mensajeError(`El campo ${e.target.id} es Obligatorio`, e.target.parentElement)
            correo[e.target.id] = "";
            comprobarEmail();
            return;
        } 

        
        // if(!validarEmail(e.target.value) && e.target.id === "email")
        if(e.target.value.trim() !== '' && e.target.id === 'emailCC' && !validarEmail(e.target.value)){
        
            mensajeError('El email con Copia no es valido', e.target.parentElement );
            correo[e.target.id] = e.target.value.trim().toLowerCase;
            comprobarEmail();
            return;
        };
        
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        correo[e.target.id] = e.target.value.trim().toLowerCase();
        // console.log(correo)

        comprobarEmail();

    }

    //creando mensaje de error
    function mensajeError(mensaje, referencia) {

        //comprobar si ya existe un alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }


        const error = document.createElement('P');
        error.textContent = mensaje;
       
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        referencia.appendChild(error)
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
        console.log(email);
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
    
});

