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


const Header = ({ menu , click, change, onClick, switchProfile, cerrarSesion, adminCuent}) =>{
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
      <div className='lupa'>

      </div>
      <div className='options'>

      </div>
    </div>
  )
}

const Pelicula = ({nombre, link, imagen, isContent, go }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => {goPelicula(link, nombre, navigate, go)}} className='pelicula' style={{backgroundImage:`url(${imagen})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
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

const goPelicula = (link, nombre, navigate, go) => {
  if(go){
    const url ='http://127.0.0.1:5000/api/consumo'
    const response = fetch(url, {
      method:'POST',
      headers: {
        'id' : JSON.parse( window.sessionStorage.getItem('perfil')).id,
        'nombre': nombre
      }
    })
    window.sessionStorage.setItem('link', link)
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
    return (
      <div className='explorar'>
        {
          allMovies.map((element, index) => {
            return (<Pelicula nombre={element.nombre} link={element.link} imagen={element.imagen} />)
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
      <Header menu={menu} click={click} change={change} onClick={changeProfile} switchProfile={switchProfile} cerrarSesion={cerrarSesion} adminCuent={adminCuent}/>
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