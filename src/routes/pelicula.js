import { useNavigate } from 'react-router-dom'
import './pelicula.css'

const Pelicula = () => {

    const navigate = useNavigate()
    const imagen = window.sessionStorage.getItem('pelicula')
    const link = window.sessionStorage.getItem('link')
    const nombre = window.sessionStorage.getItem('nombre')
    console.log(link)

    const regreso = () => {
        window.sessionStorage.removeItem('pelicula')
        window.sessionStorage.removeItem('link')
        window.sessionStorage.removeItem('nombre')
        navigate('/home')
    }

    const ingreso = () => {
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