import { Fragment, useEffect, useRef, useState } from 'react'
import './perfiles.css'


const Perfil = ({ color, nombre, click }) => {
    return(
        <div className="profileCont" onClick={click}>
            <div className="perfil" style={{background: color}}></div>
            <label>{nombre}</label>
        </div>
        
    )
}

const NewProfile = ({ clicked }) => {
    return(
        <div className="profileCont" onClick={clicked}>
            <div className="newProf"></div>
            <label>Añadir perfil</label>
        </div>
    )
}

const EnterProfile = ({ change, create, error, cancel }) => {
    return(
        <div className="enterProfile" >
            <h1 className="titleHolder">Añadir perfil</h1>
            <input className = "profileName" placeholder="Nombre del perfil" onChange={change}/>
            <p>{error ? error: ''}</p>
            <div className='buttonHolderProf'>
                <button onClick={create}>Crear</button>
                <button onClick={cancel}>Cancelar</button>
            </div>
        </div>
    )
}

const fetchPerfiles = async() => {
    const user  = JSON.parse(window.sessionStorage.getItem('user'))
    const correo = user['correo']
    const url = 'http://127.0.0.1:5000/api/perfiles'
    const response = await fetch(url, {
        method:'GET',
        headers: {
            'correo' : correo,
        }
    })
      
    const responseJson = await response.json()
    return await responseJson
}

const Perfiles = () => {

    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const colors = ['#EA5429', '#9B3BEB', '#3B43EB', '#EBDF2A', '#19E052']

    const [newProfile, setNewProfile] = useState(false)
    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState(null)

    const name = useRef(null)

    const clicked = () => {
        setNewProfile(true)
    }

    const click = (id) => {
        console.log(id)
    }

    const change = (event) => {
        name.current = event.target.value;
    }

    const create = () => {
        if(name.current !== null && name.current !== ''){
            console.log(name)
        } else {
            setError('Ingresa un nombre para el perfil.')
        }
    }

    const cancel = () => {
        setNewProfile(false)
    }

    useEffect( async () => {
        const response = await fetchPerfiles()
        await setProfiles(response)
    }, [])

    console.log(newProfile)

    return (
        <div className = "container">
            {
                newProfile ? <EnterProfile create={create} change={change} error={error} cancel={cancel}/> :
                <Fragment>
                    <h1>Tus perfiles</h1>
                    <div className='profileContainer'>
                        {
                            profiles.map((element) => {
                                const rand = Math.floor(Math.random() * (4))
                                return(<Perfil color={colors[rand]} nombre={element.nombre} 
                                    click = {() => click(element.id_perfil)}/>)
                            })
                        }
                        <NewProfile clicked = {clicked}/>
                    </div>
                </Fragment>
            }
        </div>
    )
  }
  
export default Perfiles