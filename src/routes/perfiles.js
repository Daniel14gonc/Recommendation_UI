import { Fragment, useEffect, useState } from 'react'
import './perfiles.css'


const Perfil = ({color, nombre, click}) => {
    return(
        <div className="profileCont" onClick={click}>
            <div className="perfil" style={{background: color}}></div>
            <label>{nombre}</label>
        </div>
        
    )
}

const NewProfile = () => {
    return(
        <div className="profileCont" >
            <div className="newProf"></div>
            <label>Añadir perfil</label>
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

    const [profiles, setProfiles] = useState([])

    const click = (id) => {
        console.log(id)
    }

    useEffect( async () => {
        const response = await fetchPerfiles()
        await setProfiles(response)
    }, [])

    return (
        <div className = "container">
            <h1>Tus perfiles</h1>
            <div className='profileContainer'>
                {
                    profiles.map((element) => {
                        const rand = Math.floor(Math.random() * (4))
                        return(<Perfil color={colors[rand]} nombre={element.nombre} 
                            click = {() => click(element.id_perfil)}/>)
                    })
                }
                <NewProfile />
            </div>
        </div>
    )
  }
  
export default Perfiles