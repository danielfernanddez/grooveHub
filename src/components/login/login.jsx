// Importa el hook useNavigate desde react-router-dom para la navegación programática
import { useNavigate } from 'react-router-dom'
// Importa el archivo CSS para estilizar el componente
import './login.css'
// Importa hooks useEffect y useRef desde react
import { useEffect, useRef } from 'react'


const { VITE_API } = import.meta.env
// Componente funcional Login
export const Login = () => {

    // Referencias para los campos de entrada de usuario y contraseña
    const user = useRef()
    const pass = useRef()
    const navigate = useNavigate()

    // Efecto que verifica el estado de autenticación al montar el componente
    useEffect(() => {
        // Verifica si el usuario está autenticado
        const buscar = localStorage.getItem('login')
        if(!buscar){
            // Redirige al usuario a la página principal si no está autenticado
            navigate('/')
        } else {
            // Redirige al usuario a la página de inicio si ya está autenticado
            navigate('/inicio')
        }   
    }, [navigate]) // El efecto se ejecuta al montar el componente

    // Función para manejar el inicio de sesión
    const logIn = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Obtiene los valores de los campos de entrada
        const { current: userInput } = user
        const { current: passInput } = pass
    
        try {
            // Realiza una solicitud para obtener los datos de los usuarios
            const response = await fetch(`${VITE_API}/usuarios`);
            const data = await response.json();
            
            // Busca un usuario que coincida con el email y la contraseña ingresados
            const userFound = data.find(each => each.email === userInput.value && each.password === passInput.value);

            if (userFound) {
                // Si el usuario es encontrado, guarda la autenticación en localStorage y navega a la página de inicio
                localStorage.setItem('login', 'true');
                navigate('/inicio');
                window.location.reload(); // Recarga la página para aplicar los cambios
            } else {
                // Si no se encuentra el usuario, muestra un error en la consola
                console.error('Email o password incorrectos');
            }
        } catch (error) {
            // Maneja cualquier error que ocurra durante la solicitud de inicio de sesión
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    return (
        <>
            <div className='Login-container'>
                <section className='Login-section'>
                    <h1 className='Login-h1'>grooveHub</h1>
                    {/* Formulario para el inicio de sesión */}
                    <form onSubmit={logIn} className='Login-form' action='#' method='POST'>
                        {/* Campo de entrada para el email */}
                        <input className='Login-input' type="text" name='mail' id='#' placeholder='email' ref={user}/>
                        {/* Campo de entrada para la contraseña */}
                        <input className='Login-input' type="password" name='password' id='#' placeholder='password' ref={pass}/>
                        {/* Botón de envío del formulario */}
                        <input className='Login-btn' type="submit" value="log in" />
                    </form>
                </section>
            </div>
        </>
    )
}
