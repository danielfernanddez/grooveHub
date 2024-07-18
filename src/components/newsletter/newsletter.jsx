// Importa el archivo CSS específico del componente y el CSS global
import './newsletter.css'
import '../../index.css'
// Importa el hook useRef desde react
import { useRef } from 'react';

// Componente funcional Newsletter
export const Newsletter = () => {

    // Referencia para el campo de entrada del formulario
    const newsletterInputRef = useRef()

    // Función para manejar el envío del formulario
    const comprobarForm = (e) => {
        e.preventDefault() // Previene el comportamiento por defecto del formulario

        // Obtiene el valor del campo de entrada
        const newsletterInput = newsletterInputRef.current
        if(newsletterInput.value !== "") {
            // Muestra un mensaje de agradecimiento si el campo no está vacío
            alert("Thanks for joining the Newsletter!");
        } else {
            // Muestra un mensaje de error si el campo está vacío
            alert("Insert your email please!");
        }
    }

    return(
        <>
            <div className='Newsletter'>
                <div className='Newsletter-container'>
                    {/* Texto de invitación para unirse al boletín */}
                    <span className='Newsletter-span'>Join the grooveHub newsletter!</span>
                    {/* Descripción del boletín */}
                    <p className='Newsletter-p'>Get the latest news, tips, content, and courses in dance. You'll also be the first to know about discounts and offers!</p>
                    {/* Formulario para suscribirse al boletín */}
                    <form onSubmit={comprobarForm} className='Newsletter-form' method='POST' action='#' id='Newsletter_form'>
                        {/* Campo de entrada para el email */}
                        <input ref={newsletterInputRef} className='Newsletter-input' type="email" name="mail" id="Newsletter_input" placeholder='Your Email' />
                        {/* Botón para enviar el formulario */}
                        <input className='Newsletter-submit' type="submit" name="submit" id="Newsletter_submit" value='Subscribe' />
                    </form>
                </div>
            </div>
        </>
    )
}
