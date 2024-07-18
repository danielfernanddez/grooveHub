// Importa los archivos CSS para estilizar el componente
import './header.css'
import '../../index.css'
// Importa los hooks y componentes necesarios desde react-router-dom y react
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Importa la página de inicio (no se utiliza en el código actual)
import { Inicio } from '../../pages/inicio/inicio'

const { VITE_API } = import.meta.env
// Componente funcional Header
export const Header = () => {

    // Estado para almacenar los datos del encabezado y controlar la visibilidad de un elemento
    const [ header, setHeader ] = useState([])
    const [ cross, setCross ] = useState(false)
    const navigate = useNavigate()

    // Efecto para verificar el estado de inicio de sesión y obtener datos del encabezado
    useEffect(() => {

        // Verifica si el usuario está autenticado
        const buscar = localStorage.getItem('login')
        if(!buscar){
            navigate('/')
        }

        // Configuración para la solicitud fetch
        let controller = new AbortController();
        let options = {
            method : 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
            signal: controller.signal
        };

        // Realiza la solicitud para obtener los datos del encabezado
        fetch(`${VITE_API}/header`, options)
            .then(res => res.json())
            .then(data => setHeader(data))
            .catch(err => console.log(err))
            .finally(() => controller.abort());

    }, [navigate]); // El efecto se ejecuta al montar el componente y cuando cambie `navigate`

    // Función para alternar el estado de visibilidad
    const CrossHandler = () => {
        setCross(stateActual => !stateActual);
    };

    return (
        <>
            {/* Contenedor principal del encabezado */}
            <header className='Header-header'>
                {/* Enlace al inicio que actúa como el logo */}
                <NavLink to={'inicio'}>
                    <h1 className='Header-h1'>grooveHub</h1>
                    <span className='Header-span'>gh</span>
                </NavLink>
                
                {/* Barra de navegación principal */}
                <nav className='Header-nav'>
                    <ul className='Header-ul'>
                        {/* Renderiza los iconos de navegación basados en los datos del encabezado */}
                        {header.map(each =>
                            <Iconos
                                key={each._id} { ...each }
                            />
                        )}
                        {/* Enlace a la página "Let's Dance" */}
                        <NavLink to={'/inicio'}>
                            <li className='Header-li'>
                                <span className='Header-dance'>Let's Dance</span>                            
                            </li>
                        </NavLink>
                        {/* Botón para alternar la visibilidad del menú de navegación */}
                        <button onClick={CrossHandler} className={`Header-btn ${cross === true ? 'isActive' : ''}`}>
                            {/* Elemento visual del botón */}
                            <div className='Header-cross'></div>
                        </button>
                    </ul>
                </nav>

                {/* Barra de navegación en columna que aparece cuando el estado `cross` es verdadero */}
                <nav className={`Header-columnNav ${cross === true ? 'isActive' : ''}`}>
                    <ul className='Header-columnUl'>
                        {/* Renderiza los enlaces del menú basados en los datos del encabezado */}
                        {header.map(each =>
                            <MenuLinks
                                key={each._id} { ...each }
                            />
                        )}
                        {/* Enlace a la página "Let's Dance" */}
                        <NavLink to={'/inicio'}>
                            <li className='Header-columnLi'>
                                <span className='Header-columnDance'>Let's Dance</span>                            
                            </li>
                        </NavLink>
                    </ul>
                </nav>
            </header>        
        </>
    )
}

// Componente funcional para renderizar iconos en la barra de navegación
const Iconos = (props) => {
    const { src, alt, direccion } = props
    return (
        <NavLink to={`/${direccion}`}>
            <li className='Header-li'>
                <img className='Header-img' src={src} alt={alt}/>
            </li>
        </NavLink>
    )
}

// Componente funcional para renderizar enlaces de menú en la barra de navegación en columna
const MenuLinks = (props) => {
    const { name, direccion, CrossHandler } = props
    return (
        <NavLink to={`/${direccion}`}>
            <li className='Header-columnLi'>
                <span onClick={CrossHandler} className='Header-columnSpan'>{name}</span>
            </li>
        </NavLink>
    )
}
