import './teachers.css'
import '../../index.css'
import { useEffect, useState } from 'react'

export const Teachers = () => {

    // Estado para almacenar la lista de profesores
    const [teacher, setTeacher] = useState([])
    const { VITE_API } = import.meta.env

    useEffect(() => {
        // Verifica el estado de autenticación
        const buscar = localStorage.getItem('login')
        if (!buscar) {
            navigate('/')
        }

        // Configuración para la solicitud de datos
        let controller = new AbortController();
        let options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            signal: controller.signal
        };

        // Fetch de los datos de los profesores
        fetch(`${VITE_API}/teachers`, options)
            .then(res => res.json())
            .then(data => setTeacher(data))
            .catch(err => console.log(err))
            .finally(() => controller.abort());

    }, []);

    return (
        <>
            <div className='Teachers'>
                {/* Título de la sección */}
                <h3 className='Teachers-h3'>Our teachers</h3>
                <div className='Teachers-container'>
                    {/* Mapea y renderiza cada profesor */}
                    {teacher.map(each =>
                        <CardTeacher
                            key={each._id} {...each}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

// Componente para mostrar la información de cada profesor
const CardTeacher = (props) => {
    const { teacherPhoto, teacherName, teacherStyle, alt } = props
    return (
        <div className='Teachers-card'>
            {/* Imagen del profesor */}
            <img className='Teacher-img' src={teacherPhoto} alt={alt}/>
            <div className='Teacher-info'>
                {/* Nombre y estilo del profesor */}
                <span className='Teacher-name'>{teacherName}</span>
                <span className='Teacher-style'>{teacherStyle}</span>
            </div>
        </div>
    )
}
