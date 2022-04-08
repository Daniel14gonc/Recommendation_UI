import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './newMovies.css'

const ActorDropdown = ({ actores, change, i }) => {
    console.log(i)
    return (
        <select className='selectStar' onChange={(e) => change(e, i)} >
            <option value="" selected disabled hidden>Eelegir opcion</option>
            {actores.map(
                (element) => <option value={element.nombre} >{element.nombre}</option>
            )}
        </select>
    )
}

const NewMovie = () => {
    const navigate = useNavigate()
    const [actores, setActores] = useState([])
    const act= useRef([])
    const [premios, setPremios] = useState([])
    const prem = useRef([])
    const [directores, setDirectores] = useState([])

    const [clicked, setClicked] = useState(false)

    const data = useRef(['', '', '', '', '', '', '', ''])

    const fetchEstrellas = async () => {
        const url = 'http://127.0.0.1:5000/api/admin_getEstrellas';
        const response = await fetch(url, {
          method:'GET',
        })

        const responseJson = await response.json()
        return await responseJson
    }

    const fetchPremios = async () => {
        const url = 'http://127.0.0.1:5000/api/premios';
        const response = await fetch(url, {
          method:'GET',
        })

        const responseJson = await response.json()
        return await responseJson
    }

    const fetchDirectores = async () => {
        const url = 'http://127.0.0.1:5000/api/directores';
        const response = await fetch(url, {
            method:'GET'
        })

        const responseJson = await response.json()
        return await responseJson
    }

    const fetchMovies = async () => {
        data.current[6] = act.current
        const url = 'http://127.0.0.1:5000/api/movie';
        const response = await fetch(url, {
            method:'POST',
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

    useEffect(() => { (async () => {
            const response = await fetchEstrellas()
            setActores(response)
            const response1 = await fetchPremios()
            setPremios(response1)
            const response2 = await fetchDirectores()
            setDirectores(response2)
        })()
    }, [])

    const setActor = (e, index) => {
        act.current[index] = e.target.value
        console.log(act.current)
    }

    const setPrize = (e, index) => {
        prem.current[index] = e.target.value
        console.log(prem.current)
    }

    const setDirector = (e, index=0) => {
        data.current[2] = e.target.value
    }

    const nuevo = () => {
        act.current.push('')
        setClicked(!clicked)
    }


    return (
        <div className='containerNew'>
            <div className='headerPelicula'>
                <div onClick={() => navigate('/adminhome')}></div>
            </div>
            <div className='infoPeli'>
                <h1>Título</h1>
                <input type='text' className='inputTF' onChange={(e) => {data.current[0] = e.target.value}} />
                <h1>Fecha de estreno</h1>
                <input type='date' className='inputTF' onChange={(e) => {data.current[1] = e.target.value}}/>
                <h1>Director</h1>
                <ActorDropdown actores={directores} change={setDirector}/>
                <h1>Duración</h1>
                <input type='text' className='inputTF' onChange={(e) => {data.current[3] = e.target.value}}/>
                <h1>Link</h1>
                <input type='text' className='inputTF' onChange={(e) => {data.current[4] = e.target.value}}/>
                <h1>Imagen</h1>
                <input type='text' className='inputTF' onChange={(e) => {data.current[5] = e.target.value}}/>
                <h1>Actores</h1>
                <div className='actCont'>
                    {
                        act.current.map((element, index) => <ActorDropdown actores={actores} i={index} change={setActor}/>)
                    }
                    <button className='addActor' onClick={nuevo}>Añadir nuevo</button>
                </div>
                
                <button className='addPelicula' onClick={fetchMovies}>Crear</button>
            </div>
        </div>
    )
}


export default NewMovie