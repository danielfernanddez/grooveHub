import { createContext } from 'react'
import './sliderHero.css'
import '../../index.css'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ContextSliderHero = createContext()
const { VITE_API } = import.meta.env

export const SliderHero = () => {

    const [ slider , setSlider ] = useState([])
    const [ sliderHero , setSliderHero ] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {

        const buscar = localStorage.getItem('login')
        if(!buscar){
            navigate('/')
        }

        let controller = new AbortController();
        let options = {
            method : 'GET',
            headers: {
                'Content-type' : 'application/json'
            },
            signal: controller.signal
        };

        fetch(`${VITE_API}/slider` , options)
            .then( res => res.json())
            .then( data => setSlider(data))
            .catch( err => console.log(err))
            .finally(() => controller.abort());

    }, []);

    const NextHandler = () => {
        setSliderHero( sliderHero + 1 )
        if( sliderHero >= slider.length -1 ){
            setSliderHero(0)
        }
    }

    const PrevHandler = () => {
        setSliderHero( sliderHero - 1 )
        if( sliderHero <= 0 ){
            setSliderHero( slider.length - 1 )
        } 
    }

    const ChangeHandler = ( valor ) => {
        setSliderHero( valor )
    }

    return(
        <>
            <ContextSliderHero.Provider value={{ sliderHero , setSliderHero , ChangeHandler }}>
            <div className='Slider'>
                <div
                    className='Slider-container'
                    style={{
                        width : `${ 100 * slider.length }%`,
                        gridTemplateColumns : `repeat( ${ slider.length } , 1fr )`,
                        transform : `translateX(-${ sliderHero * (100 / slider.length ) }%)`
                    }}>
                    { slider.map( each =>
                        <Images
                            key={ each._id } { ...each }
                        />
                    )}

                </div>

                <button
                    onClick={PrevHandler}
                    className={`Slider-arrow Prev ${ sliderHero === 0 ? 'isDisabled' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="#CCB4FF" d="M11.8 13H15q.425 0 .713-.288T16 12t-.288-.712T15 11h-3.2l.9-.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275l-2.6 2.6q-.3.3-.3.7t.3.7l2.6 2.6q.275.275.7.275t.7-.275t.275-.7t-.275-.7zm.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                </button>
                <button
                    onClick={NextHandler}
                    className={`Slider-arrow Next ${ sliderHero === slider.length - 1 ? 'isDisabled' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24"><path fill="#CCB4FF" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.2-9l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13z"/></svg>
                </button>

                <ul className='Slider-ul'>
                    { slider.map( each =>
                        <Li
                            key={ each._id } { ...each }
                        />
                    )}
                </ul>

            </div>
            </ContextSliderHero.Provider>        
        </>
    )
}

const Images = (props) => {
    const { _id, src, alt, text, buttonText } = props
    const { sliderHero } = useContext(ContextSliderHero)
    return (
        <div className={`Slider-wrapper ${sliderHero === _id ? 'isActive' : ''}`}>
            <img src={src} alt={alt} className='Slider-img' loading='lazy' />
            <div className='Slider-content'>
                <h2 className='Slider-h2'>{text}</h2>
                <button className='Slider-cta'>{buttonText}</button>
            </div>
        </div>
    )
}


const Li = ( props ) => {
    const { _id } = props
    const { sliderHero , ChangeHandler } = useContext(ContextSliderHero)
    return(
        <li className='Slider-li'>
            <button
                onClick={ () => ChangeHandler(_id)}
                className={`Slider-btn ${ sliderHero === _id ? 'isActive' : ''}`}>
            </button>
        </li>
    )
}