import './inicio.css'
import '../../index.css'
import { SliderHero } from '../../components/slider-hero/sliderHero'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Teachers } from '../../components/teachers/teachers'
import { CardSlider } from '../../components/card-slider/cardSlider'

export const Inicio = () => {

    const navigate = useNavigate()

    useEffect(() => {
        // Verifica si el usuario está autenticado
        const buscar = localStorage.getItem('login')
        if (!buscar) {
            navigate('/')
        }       
    }, [])

    return (
        <>
            <div className='Inicio-container'>
                <SliderHero/>
                <CardSlider/>
                <Teachers/>
            </div>
            
            {/* <button onClick={logOut}>Cerrar Sesion</button> */}
        </>
    )
}
