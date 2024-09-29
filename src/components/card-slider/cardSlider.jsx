import './cardSlider.css' // Importar estilos específicos para el componente
import '../../index.css' // Importar estilos globales
import { useContext, useState, createContext, useEffect } from 'react' // Importar hooks y contexto de React
import { useNavigate } from 'react-router-dom' // Importar hook para navegación

const ContextCardSlider = createContext() // Crear un contexto para el componente CardSlider
const { VITE_API } = import.meta.env
export const CardSlider = () => {
    // Estado para manejar los datos de las tarjetas, la visibilidad del popup y la tarjeta seleccionada
    const [card, setCard] = useState([])
    const [cardPopup, setCardPopup] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const navigate = useNavigate() // Hook para redirección

    useEffect(() => {
        // Verificar si hay un usuario autenticado en el localStorage
        const buscar = localStorage.getItem('login')
        if (!buscar) {
            navigate('/') // Redirigir al inicio si no hay usuario autenticado
        }

        // Configuración de la solicitud de fetch
        let controller = new AbortController();
        let options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            signal: controller.signal
        };

        // Obtener las tarjetas desde la API
        fetch(`${VITE_API}/cards`, options)
            .then(res => res.json())
            .then(data => setCard(data))
            .catch(err => console.log(err))
            .finally(() => controller.abort());

    }, []); // Ejecutar solo una vez al montar el componente

    // Función para manejar la apertura del popup de tarjeta
    const cardPopupHandler = (valor) => {
        setSelectedCard(valor)
        setCardPopup(true)

        const { level , style , time } = valor;

        window.dataLayer.push({
            event : 'selected_item',
            class_info : {
                level : level,
                style : style,
                time : time,
            }
        })
    }

    return (
        <>   
            <ContextCardSlider.Provider value={{card, setCard, cardPopup, setCardPopup, cardPopupHandler }}>
                <div className='CardSlider'>
                    <h3 className='CardSlider-h3'>New classes</h3>
                    <div className='CardSlider-container'>
                        {card.map(each =>
                            <Card
                                key={each._id} {...each}
                            />
                        )}
                    </div>
                </div>
                {cardPopup && selectedCard && (
                    <CardPopup {...selectedCard} />
                )}
            </ContextCardSlider.Provider>
        </>
    )
}

// Componente para renderizar cada tarjeta
const Card = (props) => {
    const { src, alt, level, style, time, iconDefault, iconAlt, teacherName, teacherPhoto } = props
    const { cardPopupHandler } = useContext(ContextCardSlider) // Usar el contexto para manejar el popup
    return (
        <div className='Card-container' onClick={() => cardPopupHandler(props)}>
            <img className='Card-img' src={src} alt={alt}/>
            <div className='Card-content'>
                <div className='Card-data'>
                    <div className='Card-info'>
                        <span className='Card-level'>{level}</span>
                        <span className='Card-style'>{style}</span>
                        <span className='Card-time'>{time}</span>
                    </div>
                    <img className='Card-icon' src={iconDefault} alt={iconAlt}/>
                </div>
                <span className='Card-teacher'>{teacherName}</span>
            </div>
        </div>
    )
}

// Componente para el popup de la tarjeta
const CardPopup = (props) => {
    const { teacherPhoto, teacherName, style, level, time } = props
    const { setCardPopup } = useContext(ContextCardSlider) // Usar el contexto para cerrar el popup
    return (
        <div className={`CardPopup ${true ? 'isActive' : ''}`}>
            <div className='CardPopup-container'>
                <button className='CardPopup-close' onClick={() => setCardPopup(false)}>
                    <img src="/assets/x-lg.svg" alt="x-lg" loading='lazy'/>
                </button>
                <div className='CardPopup-video'>
                    <img className='CardPopup-play' src="/assets/play-fill.svg" alt="play-fill" loading='lazy' />
                    <div className='CardPopup-bar'>
                        <div className='CardPopup-barleft'>
                            <img src="/assets/play-fill.svg" alt="play-fill" loading='lazy' />
                            <img src="/assets/volume.svg" alt="volume" loading='lazy'/>
                        </div>
                        <div className='CardPopup-barright'>
                            <img src="/assets/arrows-fullscreen.svg" alt="play-fill" loading='lazy'/>
                        </div>
                    </div>
                </div>
                <div className='CardPopup-content'>
                    <div className='CardPopup-class'>
                        <div className='CardPopup-teacher'>
                            <img className='CardPopup-teacherimg' src={teacherPhoto} alt={teacherName} loading='lazy' />
                            <span className='CardPopup-teachername'>{teacherName}</span>
                        </div>
                        <div className='CardPopup-data'>
                            <span className='CardPopup-style'>{style}</span>
                            <span className='CardPopup-level'>{level}</span>
                            <span className='CardPopup-time'>{time}</span>
                        </div>
                    </div>
                    <div className='CardPopup-more'>
                        <div className='CardPopup-svg'>
                            <img src="/assets/share.svg" alt="share" loading='lazy'/>
                            <img src="/assets/three-dots.svg" alt="more" loading='lazy' />
                        </div>
                        <span>grooveHub</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

