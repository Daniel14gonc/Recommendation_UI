import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './newAnuncio.css'


const NewAnuncio = () => {
    const condata = useRef('')
    const [anunciantes, setAnunciantes] = useState([])
    const anun = useRef('')

    const navigate = useNavigate()

    

    const fetchAnunciantess = async() =>{
        const url3 = 'http://127.0.0.1:5000/api/admin_getAnunciantes';
        const response = await fetch(url3, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchAnuncio = async () => {
        const url = 'http://127.0.0.1:5000/api/anuncio';
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link : condata.current,
                anunciante : anun.current
            })
        })

        const responseJson = await response.json()
        navigate('/adminhome')
        return await responseJson
    }

    useEffect( () => { async function anuncito() { 
        const response2 = await fetchAnunciantess()
        await setAnunciantes(response2)
      } 
      anuncito()
    }, [])

    const change = (event) => {
        anun.current = event.target.value
    }


    return (
        <div className='containerNew'>
            <div className='headerPelicula'>
                <div onClick={() => navigate('/adminhome')}></div>
            </div>
            <div className='infoPeli'>
                <h1>Link</h1>
                <input type='text' className='inputTF' onChange={(e) => {condata.current = e.target.value}} />
                <select className='selectAnunciante1' onChange={change}>
                    <option value="" selected disabled hidden>{'Seleccione anunciante'}</option>
                    {anunciantes.map(
                        (element) => <option value={element.nombre}>{element.nombre}</option>
                    )}
                </select>
                <button className='addPelicula' onClick={fetchAnuncio}>Crear</button>
            </div>
        </div>
    )
}


export default NewAnuncio