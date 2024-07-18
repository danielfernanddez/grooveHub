import './collection.css'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CardSlider } from '../../components/card-slider/cardSlider'

export const Collection = () => {

    const navigate = useNavigate()
    useEffect(() => {

        const buscar = localStorage.getItem('login')
        if(!buscar){
            navigate('/')
        }
    } , [] )

    return(
        <>
            <div className='Collection'>
                <CardSlider/>
            </div>
        </>
    )
}