import './users.css'; // Importa el archivo de estilos específico para este componente
import { createContext, useContext, useEffect, useRef, useState } from 'react'; // Importa hooks y funcionalidades de React
import { useNavigate } from 'react-router-dom'; // Importa hook para navegación

// Crea un contexto para manejar el estado global de usuarios
const UsersContext = createContext();
const { VITE_API } = import.meta.env

export const Users = () => {

    // Referencias para los campos de entrada en el formulario
    const emailRef = useRef();
    const passwordRef = useRef();

    const updateUser = useRef();
    const updatePassword = useRef();
    const updateId = useRef();

    // Estado para almacenar la lista de usuarios y el estado del popup
    const [usuario, setUsuario] = useState([]);
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    const LogOutHandle = () => {
        localStorage.removeItem('login')
        navigate('/')
        window.location.reload();
    }   

    // Efecto para verificar la autenticación y cargar los datos de usuarios
    useEffect(() => {

        // Verifica si el usuario está autenticado
        const buscar = localStorage.getItem('login');
        if (!buscar) {
            navigate('/');
        }   

        let controller = new AbortController();
        let options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            signal: controller.signal
        };

        // Obtiene la lista de usuarios
        fetch(`${VITE_API}/usuarios`, options)
            .then(res => res.json())
            .then(data => setUsuario(data))
            .catch(err => console.log(err))
            .finally(() => controller.abort());

    }, []);

    // Muestra u oculta el popup
    const PopupHandler = (valor) => {
        setPopup(valor);
    }

    // Elimina un usuario
    const eliminarUser = async (_id) => {
        console.log("ID a eliminar:", _id);
        let eliminar = usuario.filter(each => each._id !== _id);
        let controller = new AbortController();

        try {
            let options = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                signal: controller.signal
            }
            const response = await fetch(`${VITE_API}/usuarios/id/${_id}`, options);
            if (!response.ok) {
                throw new Error('Error al eliminar usuario');
            }
            setUsuario(eliminar);
        } catch (error) {
            console.log(error);
        } finally {
            controller.abort();
        }
    }

    // Agrega un nuevo usuario
    const anadirUser = async (e) => {
        e.preventDefault();
        const { current: emailInput } = emailRef;
        const { current: passwordInput } = passwordRef;
        let nuevo = {
            email: emailInput.value,
            password: passwordInput.value
        };
        let controller = new AbortController();

        try {
            let options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify(nuevo)
            }
            const response = await fetch(`${VITE_API}/usuarios`, options);
            if (!response.ok) {
                throw new Error('Error al agregar usuario');
            }
            const data = await response.json();
            setUsuario([...usuario, data]);
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            controller.abort();
        }
    }

    // Prepara los campos para editar un usuario
    const editarUser = (_id) => {
        const { current: inputId } = updateId;
        const { current: inputUser } = updateUser;
        const { current: inputPass } = updatePassword;

        const buscar = usuario.find(each => each._id === _id);

        inputId.value = buscar._id;
        inputUser.value = buscar.email;
        inputPass.value = buscar.password;
    }

    // Envía los datos actualizados para un usuario
    const updateSubmit = async (e) => {
        e.preventDefault();

        const { current: inputId } = updateId;
        const { current: inputUser } = updateUser;
        const { current: inputPass } = updatePassword;

        const updatedUser = {
            email: inputUser.value,
            password: inputPass.value,
        };

        let controller = new AbortController();

        try {
            let options = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify(updatedUser)
            };

            const response = await fetch(`${VITE_API}/usuarios/id/${inputId.value}`, options);
            if (!response.ok) {
                throw new Error('Error al actualizar usuario');
            }

            const updatedUsers = usuario.map(user =>
                user._id === inputId.value ? { ...user, ...updatedUser } : user
            );

            setUsuario(updatedUsers);
            setPopup(false);
        } catch (error) {
            console.log(error);
        } finally {
            controller.abort();
        }
    };

    return (
        // Proporciona el contexto a los componentes hijos
        <UsersContext.Provider value={{ LogOutHandle, usuario, setUsuario, popup, setPopup, PopupHandler, eliminarUser, anadirUser, editarUser, updateUser, updatePassword, updateId, updateSubmit }}>
            <div className='Users'>
                <span className='Users-text'>MANAGE YOUR USERS</span>
                <button onClick={LogOutHandle} className='Users-logout'>Log Out</button>
                <div className='Users-container'>
                    <div className='Anadir'>
                        <span className='Anadir-texto'>Create new user</span>
                        <form onSubmit={anadirUser} className='Anadir-form' method='POST' action='#'>
                            <input className='Anadir-input' type="text" placeholder='email' ref={emailRef} />
                            <input className='Anadir-input' type="password" placeholder='password' ref={passwordRef} />
                            <input className='Anadir-submit' type="submit" value="Añadir" />
                        </form>
                    </div>
                    {/* Mapea los usuarios y renderiza una tarjeta para cada uno */}
                    {usuario.map(each =>
                        <UserCard key={each.id} {...each} />
                    )}
                </div>
            </div>
            {/* Mapea los usuarios y renderiza un popup para cada uno */}
            {usuario.map(each =>
                <PopUp
                    key={each._id} {...each}
                />
            )}
        </UsersContext.Provider>
    );
}

// Componente para mostrar la tarjeta de un usuario
const UserCard = (props) => {
    const { email, _id } = props;
    const { PopupHandler, eliminarUser, editarUser } = useContext(UsersContext);
    const imagenAhora = '/assets/gh-logo.png';

    return (
        <div className='Box'>
            <div className='Box-user'>
                <img className='Box-img' src={imagenAhora} alt="imagen-perfil" loading='lazy' />
                <span className='Box-name'>{email}</span>
            </div>
            <div className='Box-btn'>
                <button onClick={() => { PopupHandler(true); editarUser(_id) }} className='Box-edit'>edit</button>
                <button onClick={() => eliminarUser(_id)} className='Box-delete'>Delete user</button>
            </div>
        </div>
    );
};

// Componente para el popup de edición de usuario
const PopUp = (props) => {
    const { popup, PopupHandler, usuario, eliminarUser, updatePassword, updateUser, updateId, updateSubmit } = useContext(UsersContext);
    const { email, password, _id } = props;
    console.log('ID del usuario en POPUP', _id);

    return (
        <div className={`Popup-container ${popup === true ? 'isActive' : ''}`}>
            <button className='Popup-close' onClick={() => PopupHandler(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ffffff" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
            </button>
            <div className='Popup-div'>
                <h2 className='Popup-h2'>Edita tu perfil</h2>
                <form className='Popup-form' onSubmit={updateSubmit} method='POST' action='#'>
                    <input type="text" placeholder='ID' ref={updateId} />
                    <input className='Popup-input' type="text" name='mail' placeholder={email} ref={updateUser} />
                    <input className='Popup-input' type="password" name='password' placeholder='password' ref={updatePassword} />
                    <input className='Popup-edit' type="submit" value="Edit user" />
                </form>
            </div>
        </div>
    );
};
