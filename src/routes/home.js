import { eventWrapper } from '@testing-library/user-event/dist/utils'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
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
      'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id
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
      'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id
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
      'id':JSON.parse( window.sessionStorage.getItem('perfil')).id
    }
  })
  const responseJson = await response.json()
  return await responseJson
}


const Header = ({ onChange, pelis, buscar, menu , click, change, onClick, switchProfile, cerrarSesion, adminCuent , busqueda}) =>{
  const nombre = JSON.parse(window.sessionStorage.getItem('perfil')).nombre
  return(
    <div className='headercito'>
      <div  style={{marginRight:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div onClick={onClick} className='userbubble'></div>
        {change && 
        <div className='dropdown'>
          <div className='switch' style={{color:'#4e91dd'}}>{nombre}</div>
          <div className='switch' onClick={adminCuent}>Administrar cuenta</div>
          <div className='switch' onClick={switchProfile}>Cambiar perfil</div>
          <div style={{color:'red'}} className='switch' onClick={cerrarSesion}>Cerrar sesión</div>
        </div>
        }
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
      {buscar && 
        <input onChange={onChange} onKeyDown={pelis} className = "busqueda" placeholder="Busca peliculas..." />}
      <div className='lupa' onClick={busqueda}>

      </div>
    </div>
  )
}

const Pelicula = ({nombre, link, imagen, isContent, go }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {goPelicula(link, nombre, navigate, go, imagen)}} className='pelicula' style={{backgroundImage:`url(${imagen})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
      {isContent && <p style={{color:'white'}}>No hay películas aquí :(</p>}        
    </div>
  )
}

const MiLista = ({ movies }) => {
  return (
    <div>
      {
        movies.length!==0 ? <Explorar allMovies={movies} /> :
        <div>
          <p style={{color:'white'}}>No tienes peliculas en tu lista...</p>
        </div>
      }
    </div>
  )
}

const goPelicula = (link, nombre, navigate, go, imagen) => {
  if(go){
    window.sessionStorage.setItem('link', link)
    window.sessionStorage.setItem('pelicula', imagen)
    window.sessionStorage.setItem('nombre', nombre)
    navigate('/pelicula')
  }
}


const Carrousel = ({contenido, nombre, imagen}) => {
  console.log(contenido.length)


  if(contenido.length === 0){

    return (
      <div className='carrousel'>
        <div style={{color:'white', fontSize:'20px'}}>{nombre}</div>
        <div className='containMovies'>
          <Pelicula go={false} imagen = '../../assets/nocontent.png' isContent={'si'}/>
        </div>
      </div>
    )
  } else {

    return (
      <div className='carrousel'>
        <div style={{color:'white', fontSize:'20px'}}>{nombre}</div>
        <div className='containMovies'>
          {
            contenido.map((elemento) => {
              return (<Pelicula go={true} nombre = {elemento.nombre} link ={elemento.link} imagen = {elemento.imagen}/>)
            })
          }
        </div>
      </div>
    )
  }
}

const Explorar = ({ allMovies }) => {
    if(allMovies.length===0){
      return (
        <div className='explorar'>
          <Pelicula go={false} imagen = '../../assets/nocontent.png' isContent={'si'} />
        </div>
      )
    } else {
      return (
        <div className='explorar'>
          {
            allMovies.map((element, index) => {
              return (<Pelicula go={true} nombre={element.nombre} link={element.link} imagen={element.imagen} />)
            })
          }
        </div>
      )
    }
    
}

const Busqueda = ({ movies }) => {
  return (
    <div>
      {
        movies.length!==0 ? <Explorar allMovies={movies} /> :
        <div>
          <p style={{color:'white'}}>Ninguna película aparece en el resultado...</p>
        </div>
      }
    </div>
  )
}

const BigFilm = ({link, image, nombre}) => {
  const navigate = useNavigate()
  return (
    <div className='superDiv' style={{backgroundImage:`url(${image})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat'}}>
        <div className='superFilm' onClick={()=>goPelicula(link, nombre, navigate, true, image)}>
          <div className='play'></div>
          <div style = {{marginLeft:'30px'}}>Reproducir</div>
        </div>
    </div>
  )
}



const Home = () =>{

  const navigate = useNavigate()

  const [sugerido, setSugerido] = useState([])
  const [verdeNuevo, setVerdenuevo] = useState([])
  const [random, setRandom] = useState([])
  const [seguirV, setSeguirV] = useState([])
  const [menu, setMenu] = useState([{nombre:'Inicio', clicked: true}, {nombre:'Explorar', clicked: false}, 
                                      {nombre:'Mi lista', clicked: false}])
  
  const [explorar, setExplorar] = useState([]) 
  const [favorito, setFavorito] = useState([])     
  const [change, setChange] = useState(false)    
  const [loading, setLoading] = useState(true)        
  const [buscar, setBuscar] = useState(false)     
  const [search, setSearch] = useState(false)  
  const[searchResult, setSearchResult] = useState([]) 
  const[text, setText] = useState('')            

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
    setSearch(false)
    setBuscar(false)
    setSearchResult([])
    setMenu(oldMenu)
  }

  const adminCuent = () =>{
    navigate('/adminCuenta')

  }

  const changeProfile = () => {
    setChange(!change)
  }

  const switchProfile = async () => {

    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const profile = JSON.parse(window.sessionStorage.getItem('perfil'))
    const correo = user['correo']
    const url = 'http://127.0.0.1:5000/api/perfiles'
    const response = await fetch(url, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'correo': correo,
            'nombre': profile.nombre,
            'dentro' : 'false'
        })
    })

    const responseJson = await response.json()
    window.sessionStorage.removeItem('perfil')
    navigate('/perfiles')
  }

  const cerrarSesion = async() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const profile = JSON.parse(window.sessionStorage.getItem('perfil'))
    const correo = user['correo']
    const url = 'http://127.0.0.1:5000/api/perfiles'
    const response = await fetch(url, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'correo': correo,
            'nombre': profile.nombre,
            'dentro' : 'false'
        })
    })

    const responseJson = await response.json()
    window.sessionStorage.clear()
    navigate('/')
  }

  const busqueda = () => {
    const oldMenu = [...menu]
    oldMenu[0].clicked = true
    setBuscar(!buscar)
  }

  const onChange = (event) => {
    setText(event.target.value)
  }

  const fetchPeliculas = async(event) => {
    if(event.key === 'Enter'){
      console.log(event.key)
      const url = 'http://127.0.0.1:5000/api/contenido'
      const response = await fetch(url, {
        method:'GET',
        headers: {
          'nombre' : text
        }
      })
      setSearch(true)
      const oldMenu = [...menu]
      oldMenu.map((element, i) => {
        element.clicked = false
      })
      const responseJson = await response.json()
      setSearchResult(responseJson)
    }
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
      setLoading(false)
    } 
    sugeridito()
  }, [menu])

  if(loading){
    return (
      <div className='container2'>
        <div className='loading'></div>
      </div>
    )
  }


  

  return(
    <div className="containerhome">
      <Header onChange={onChange} pelis = {fetchPeliculas} buscar={buscar} busqueda={busqueda} menu={menu} click={click} change={change} onClick={changeProfile} switchProfile={switchProfile} cerrarSesion={cerrarSesion} adminCuent={adminCuent}/>
      <div className='contentFilms'>
        {
          menu[0].clicked && 
          <Fragment>
            <BigFilm image={random.imagen} link={random.link} nombre={random.nombre}/>
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
        {
          search && 
          <Busqueda movies={searchResult}/>
        }
        
      </div>
    </div>
  )
}


export default Home