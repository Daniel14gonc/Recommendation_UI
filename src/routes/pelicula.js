import React, { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './pelicula.css'

const Anuncio = ({setAnun}) =>{
    return(
        <Fragment>
            <div className='cualq'>
                <div className='modal-content'>
                    <button className='cerrar' onClick={() => setAnun(false)}></button>
                </div>
            </div>
            <div className='modal-container'></div>
        </Fragment>
    )

}

const fetchTipo = async(tipo) =>{
    
}

const Pelicula = () => {

    const navigate = useNavigate()

    const [clik,setClik] = React.useState(false)
    const [megust,setMegust] = React.useState(false)
    const [anun, setAnun] = React.useState(false)
    const interval = useRef(null)
    const tipo = useRef(null)

    const imagen = window.sessionStorage.getItem('pelicula')
    const link = window.sessionStorage.getItem('link')
    const nombre = window.sessionStorage.getItem('nombre')
    

    const regreso = () => {
        window.sessionStorage.removeItem('pelicula')
        window.sessionStorage.removeItem('link')
        window.sessionStorage.removeItem('nombre')
        clearInterval(interval.current)
        navigate('/home')
    }

    const ingreso = async() => {
        const url ='http://127.0.0.1:5000/api/consumo'
        fetch(url, {
            method:'POST',
            headers: {
                'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
                'contenido': nombre
            }
            })
        const url1 ='http://127.0.0.1:5000/api/pelicula'
        fetch(url1, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
                'nombre': nombre
            })
        })
        
    
        

        setClik(true)
        if(tipo.current === 'basica'){
            setAnun(true)
            interval.current = setInterval( () => {
            setAnun(true)},10000)
        }
        
    }

    const terminado = () => {
        const url ='http://127.0.0.1:5000/api/pelicula'
        fetch(url,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
                'nombre': nombre
            })
        })

        clearInterval(interval.current)
        navigate('/home')
    }

    const favoritos = async() =>{
        
        if(megust===false){
            const url ='http://127.0.0.1:5000/api/favoritos'
            const todos = await fetch(url,{
                method:'GET',
                headers: {
                    'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id
                }
            })

            const res = await todos.json()
            fetch(url,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    'idperfil' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
                    'nombre': nombre
                })
            })
            setMegust(true)
        }
        else {
            const url ='http://127.0.0.1:5000/api/favoritos'
            const todos = await fetch(url,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    'idperfil' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
                    'nombre': nombre
                })
            })
            setMegust(false)
        }
        

    }

    useEffect( ()=>{ async function favoritito(){
        const url ='http://127.0.0.1:5000/api/favoritos'
        const todos = await fetch(url,{
            method:'GET',
            headers: {
                'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id
            }
        })

        const res = await todos.json()
        const resT = res.filter((elementos)=> {if(elementos.nombre === nombre){setMegust(true)}})
        const url1 = 'http://127.0.0.1:5000/api/ajustecuenta'
        const response = await fetch(url1, {
            method:'GET',
            headers: {
                'correo' : JSON.parse( window.sessionStorage.getItem('user')).correo
            }
        })
            
        const responseJson = await response.json()
        tipo.current = responseJson.tipo
    }
    favoritito()
    },[])

    return (
        <div className='containerPelicula'>
            {anun && <Anuncio setAnun={setAnun}/>}
            <div className='headerPelicula'>
                <div onClick={() => regreso()}></div>
            </div>)
            <div className='filmHolder'  style={{backgroundImage:`url(${imagen})`, backgroundSize:'100% 100%'}}>
                <a href={link} onClick = {() => ingreso()} target="_blank" style={{textDecoration:'none', display:'flex', flexDirection: 'row', color:'black', fontSize: '20px'}} rel="noopener noreferrer">
                    <div></div>
                </a>
            </div>
            <div className='buttonholderc'>
                <div className={megust ? 'like' : 'like2'} onClick = {favoritos} ></div>
                {clik && <button className='completado' onClick={() => terminado()} >Completado</button>}
            </div>
        </div>
    )
}

export default Pelicula