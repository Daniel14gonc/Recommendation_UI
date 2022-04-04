import { useNavigate } from 'react-router-dom'
import './pelicula.css'

const Pelicula = () => {

    const navigate = useNavigate()
    const imagen = window.sessionStorage.getItem('pelicula')
    const link = window.sessionStorage.getItem('link')
    console.log(link)

    const regreso = () => {
        window.sessionStorage.removeItem('pelicula')
        window.sessionStorage.removeItem('link')
        navigate('/home')
    }

    const ingreso = () => {
        
    }

    return (
        <div className='containerPelicula'>
            <div className='headerPelicula'>
                <div onClick={() => regreso()}></div>
            </div>)
            <div className='filmHolder' onClick = {() => ingreso()} style={{backgroundImage:`url(${imagen})`, backgroundSize:'100% 100%'}}>
                <a href={link} target="_blank" style={{textDecoration:'none', display:'flex', flexDirection: 'row', color:'black', fontSize: '20px'}} rel="noopener noreferrer">
                    <div></div>
                </a>
            </div>
            <div className='buttonholderc'>
                <div className='like' style={{background: false ? 'url(../../assets/faved)' : 'url(../../assets/favoritito)'}}></div>
                <button className='completado'>Completado</button>
            </div>
        </div>
    )
}

export default Pelicula