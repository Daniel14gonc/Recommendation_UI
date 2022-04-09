import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './editarPelicula.css'

const ActorDropdown = ({ actores, change, i , director}) => {
    return (
        <select className='selectStar' onChange={(e) => change(e, i)} >
            <option value="" selected disabled hidden>{director}</option>
            {actores.map(
                (element) => <option value={element.nombre} >{element.nombre}</option>
            )}
        </select>
    )
}

const EditMovie = () => {
    const navigate = useNavigate()
    const [directores, setDirectores] = useState([])
    const datat = useRef([])

    const [clicked, setClicked] = useState(false)

    const data = useRef(['', '', '', '', ''])




    const fetchDirectores = async () => {
        const url = 'http://127.0.0.1:5000/api/directores';
        const response = await fetch(url, {
            method:'GET'
        })

        const responseJson = await response.json()
        return await responseJson
    }

    const fetchMovies = async () => {
        const url = 'http://127.0.0.1:5000/api/movie';
        const response = await fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data : data.current
            })
        })

        const responseJson = await response.json()
        navigate('/adminhome')
        return await responseJson
    }

    const fetchPeli = async () =>{
        const url = 'http://127.0.0.1:5000/api/editPelis'
        const response = await fetch(url, {
          method:'GET',
          headers: {
            'nombre' : window.sessionStorage.getItem('pelicula')
          }
        })
        const responseJson = await response.json()
        return(responseJson)
    }

    useEffect(() => { (async () => {
            const response2 = await fetchDirectores()
            setDirectores(response2)
            const response = await fetchPeli()
            datat.current = response
        })()
    }, [])

    const setDirector = (e, index=0) => {
        data.current[2] = e.target.value
    }


    return (
        <div className='containerNew'>
            <div className='headerPelicula'>
                <div onClick={() => navigate('/adminhome')}></div>
            </div>
            <div className='infoPeli'>
                <h1>Nombre</h1>
                <input type='text' className='inputTF1' onChange={(e) => {data.current[0] = e.target.value}} defaultValue={window.sessionStorage.getItem('pelicula')}/>
                <h1>Director</h1>
                <ActorDropdown actores={directores} change={setDirector} director={'yo'}/>
                <h1>Duración</h1>
                <input type='text' className='inputTF1' onChange={(e) => {data.current[3] = e.target.value}} defaultValue={'2'}/>
                <h1>Link</h1>
                <input type='text' className='inputTF1' onChange={(e) => {data.current[4] = e.target.value}} defaultValue={'2'}/>
                <h1>Imagen</h1>
                <input type='text' className='inputTF1' onChange={(e) => {data.current[5] = e.target.value}} defaultValue={'2'}/>
                <button className='addPelicula' onClick={fetchMovies}>Confirmar Cambios</button>
            </div>
        </div>
    )
}


export default EditMovie