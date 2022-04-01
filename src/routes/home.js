import { useState, useEffect } from 'react'
import './home.css'


const fetchSugerido = async() =>{
  const url = 'http://127.0.0.1:5000/api/sugerencias'
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'id' : window.sessionStorage.getItem('idperfil')
    }
  })
      
  const responseJson = await response.json()
  return await responseJson
}

const fetchRandom = async() =>{
  const url ='http://127.0.0.1:5000/api/randomcontenido'
  const response = await fetch(url, {
    method:'GET',
  })
  const responseJson = await response.json()
  return await responseJson
}

const fetchVerdenuevo = async() =>{
  const url = 'http://127.0.0.1:5000/api/verdenuevo'
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'id' : window.sessionStorage.getItem('idperfil')
    }
  })
      
  const responseJson = await response.json()
  return await responseJson
}


const Header = () =>{

  return(
    <div className='headercito'>
      <div className='userbubble'>

      </div>
      <div className='navegable'>
        <div>
          <p>Inicio</p>
        </div>
        <div>
          <p>Explorar</p>
        </div>
        <div>
          <p>Mi lista</p>
        </div>
      </div>
      <div className='lupa'>

      </div>
      <div className='options'>

      </div>
    </div>
  )
}

const Pelicula = ({link, imagen}) => {
  return (
    <a href={link} target="_blank" style={{textDecoration:'none'}} rel="noopener noreferrer">
      <div className='pelicula' style={{background:`url(${imagen})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
      </div>
    </a>
  )
}


const Carrousel = ({contenido, nombre, imagen}) => {


  return (
    <div className='carrousel'>
      <div style={{color:'white', fontSize:'20px'}}>{nombre}</div>
      <div className='containMovies'>
        {
          contenido.map((elemento) => {
            return (<Pelicula nombre = {elemento.nombre} link ={elemento.link} imagen = {elemento.imagen}/>)
          })
        }
      </div>
    </div>
  )
}


const BigFilm = ({link, image}) => {
  return (
    <div className='superDiv' style={{backgroundImage:`url(${image})`}}>
      <a href={link} target="_blank" style={{textDecoration:'none'}} rel="noopener noreferrer">
        <div className='superFilm'>
          <div className='play'></div>
          <div style = {{marginLeft:'30px'}}>Reproducir</div>
        </div>
      </a>
    </div>
  )
}




const Home = () =>{
  const [sugerido, setSugerido] = useState([])
  const [verdeNuevo, setVerdenuevo] = useState([])
  const [random, setRandom] = useState([])

  useEffect( () => { async function sugeridito() { 
      const response = await fetchSugerido()
      await setSugerido(response)
      const response1 = await fetchVerdenuevo()
      await setVerdenuevo(response1)
      const response2 = await fetchRandom()
      await setRandom(response2)
    } 
    sugeridito()
  }, [])

  return(
    <div className="containerhome">
      <Header />
      <div className='contentFilms'>
        <BigFilm image={random.image}/>
        <Carrousel nombre = 'Sugerido' contenido = {sugerido}/>
        <Carrousel nombre = 'Ver nuevamente' contenido = {verdeNuevo}/>
      </div>
    </div>
  )
}


export default Home