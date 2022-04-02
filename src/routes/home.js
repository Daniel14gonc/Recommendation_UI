import { useState, useEffect, Fragment } from 'react'
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

const fetchSeguirV = async() =>{
  const url = 'http://127.0.0.1:5000/api/seguirviendo'
  const response = await fetch(url, {
    method:'GET',
    headers: {
      'id' : window.sessionStorage.getItem('idperfil')
    }
  })
      
  const responseJson = await response.json()
  return await responseJson
}

const fetchExplorar = async() =>{
  const url ='http://127.0.0.1:5000/api/all-contenido'
  const response = await fetch(url, {
    method:'GET',
  })
  const responseJson = await response.json()
  return await responseJson
}

const fetchFavoritos = async() =>{
  const url ='http://127.0.0.1:5000/api/favoritos'
  const response = await fetch(url, {
    method:'GET',
    headers:{
      'id':window.sessionStorage.getItem('idperfil')
    }
  })
  const responseJson = await response.json()
  return await responseJson
}


const Header = ({ menu , click }) =>{
  console.log(menu)
  return(
    <div className='headercito'>
      <div className='userbubble'>

      </div>
      <div className='navegable'>
        {
          menu.map((element, index) => {
            return(
              <div>
                <p onClick={()=> click(index)} style={{fontWeight: element.clicked ?'bold':'normal'}} >{element.nombre}</p>
              </div>
            )
          })
        }
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
    
      <div className='pelicula' style={{background:`url(${imagen})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
        <div>
          <button className='favorite' onClick = {() => console.log('justi')}></button>
        </div>
        <a href={link} target="_blank" style={{textDecoration:'none'}} rel="noopener noreferrer">
          <div style = {{width:'250px', height:'100px'}}></div>
        </a>
      </div>
  )
}

const MiLista = ({ movies }) => {
  return (
    <div>
      {
        movies ? <Explorar allMovies={movies} /> :
        <div>
          <p style={{color:'white'}}>No tienes peliculas en tu lista.</p>
        </div>
      }
    </div>
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

const Explorar = ({ allMovies }) => {
    return (
      <div className='explorar'>
        {
          allMovies.map((element, index) => {
            return (<Pelicula link={element.link} imagen={element.imagen} />)
          })
        }
      </div>
    )
} 


const BigFilm = ({link, image}) => {
  return (
    <div className='superDiv' style={{backgroundImage:`url(${image})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat'}}>
        <div className='superFilm'>
          <a href={link} target="_blank" style={{textDecoration:'none', display:'flex', flexDirection: 'row', color:'black', fontSize: '20px'}} rel="noopener noreferrer">
            <div className='play'></div>
            <div style = {{marginLeft:'30px'}}>Reproducir</div>
          </a>
        </div>
    </div>
  )
}




const Home = () =>{
  const [sugerido, setSugerido] = useState([])
  const [verdeNuevo, setVerdenuevo] = useState([])
  const [random, setRandom] = useState([])
  const [seguirV, setSeguirV] = useState([])
  const [menu, setMenu] = useState([{nombre:'Inicio', clicked: true}, {nombre:'Explorar', clicked: false}, 
                                      {nombre:'Mi lista', clicked: false}])
  
  const [explorar, setExplorar] = useState([]) 
  const [favorito, setFavorito] = useState([])                                  

  const click = (index) => {
    const oldMenu = [...menu]
    oldMenu.map((element, i) => {
      if (i === index){
        element.clicked = true
      }
      else{
        element.clicked = false
      }
    })
    setMenu(oldMenu)
  }

  useEffect( () => { async function sugeridito() { 
      const response = await fetchSugerido()
      await setSugerido(response)
      const response1 = await fetchVerdenuevo()
      await setVerdenuevo(response1)
      const response2 = await fetchRandom()
      await setRandom(response2)
      const response3 = await fetchSeguirV()
      await setSeguirV(response3)
      const response4 = await fetchExplorar()
      await setExplorar(response4)
      const response5 = await fetchFavoritos()
      await setFavorito(response5)
    } 
    sugeridito()
  }, [menu])



  

  return(
    <div className="containerhome">
      <Header menu={menu} click={click}/>
      <div className='contentFilms'>
        {
          menu[0].clicked && 
          <Fragment>
            <BigFilm image={random.imagen} link={random.link}/>
            <Carrousel nombre = 'Seguir viendo' contenido = {seguirV}/>
            <Carrousel nombre = 'Sugerido' contenido = {sugerido}/>
            <Carrousel nombre = 'Ver nuevamente' contenido = {verdeNuevo}/>
          </Fragment>
        }
        {
          menu[1].clicked && 
          <Explorar allMovies={explorar} />
        }
        {
          menu[2].clicked && 
          <MiLista movies = {favorito}/>
        }
        
      </div>
    </div>
  )
}


export default Home