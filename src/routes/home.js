import { useState, useEffect } from 'react'
import './home.css'





const fetchSugerido = async() =>{
  const user  = JSON.parse(window.sessionStorage.getItem('user'))
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

const Pelicula = ({nombre}) => {
  return (
    <div className='pelicula'>
      <p>{nombre}</p>
    </div>
  )
}


const Carrousel = ({contenido, nombre}) => {


  return (
    <div className='carrousel'>
      <div style={{color:'white', fontSize:'20px'}}>{nombre}</div>
      <div className='containMovies'>
        {
          contenido.map((elemento) => {
            return (<Pelicula nombre = {elemento.nombre}/>)
          })
        }
      </div>
    </div>
  )
}


const BigFilm = ({image}) => {
  return (
    <div className='superDiv' style={{backgroundImage:`url(${image})`}}>
      <div className='superFilm'>
        <div className='play'></div>
        <div style = {{marginLeft:'30px'}}>Reproducir</div>
      </div>
    </div>
  )
}




const Home = () =>{
  const [sugerido, setSugerido] = useState([])

  useEffect( () => { async function sugeridito() { 
      const response = await fetchSugerido()
      await setSugerido(response)
    } 
    sugeridito()
  }, [])

  return(
    <div className="containerhome">
      <Header />
      <div className='contentFilms'>
        <BigFilm />
        <Carrousel nombre = 'Sugerido' contenido = {sugerido}/>
      </div>
    </div>
  )
}


export default Home