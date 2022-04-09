import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './newAnunciante.css'


const NewAnunciante = () => {
    const navigate = useNavigate()

    const condata = useRef('')


    const fetchAnunciantess = async () => {
        const url = 'http://127.0.0.1:5000/api/anunciantes';
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data : condata.current
            })
        })

        const responseJson = await response.json()
        navigate('/adminhome')
        return await responseJson
    }



    return (
        <div className='containerNew1'>
            <div className='headerPelicula'>
                <div onClick={() => navigate('/adminhome')}></div>
            </div>
            <div className='infoPeli'>
                <h1>Nombre</h1>
                <input type='text' className='inputTF1' onChange={(e) => {condata.current = e.target.value}} />
                <button className='addPelicula' onClick={fetchAnunciantess}>Crear</button>
            </div>
        </div>
    )
}


export default NewAnunciante