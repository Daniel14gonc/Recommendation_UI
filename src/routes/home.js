import './home.css'

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

const Pelicula = () => {
  return (
    <div className='pelicula'>

    </div>
  )
}


const Carrousel = () => {

  const temp = ['hola', 'adios', 'si', 'no', 'hola', 'adios', 'si', 'no']

  return (
    <div className='carrousel'>
      <div style={{color:'white', fontSize:'20px'}}>Nombre</div>
      <div className='containMovies'>
        {
          temp.map(() => {
            return (<Pelicula />)
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

  return(
    <div className="containerhome">
      <Header />
      <div className='contentFilms'>
        <BigFilm />
        <Carrousel />
      </div>
    </div>
  )
}


export default Home