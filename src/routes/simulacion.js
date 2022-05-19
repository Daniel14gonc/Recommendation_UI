import { useState, useEffect, useRef, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import './simulacion.css'

const Simulacion = ({directo, acto, cant}) => {
    const fecha = useRef(null)
    const cantidad = useRef(null)
    const [error, setError] = useState('')
    

    
    const fetchTop10gen = async() => {
        const url = 'http://127.0.0.1:5000/api/simulacion';
        const response = await fetch(url, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'fecha': fecha.current,
            cantidad: cantidad.current
          })
        })
            
        const responseJson = await response.json()
        if (responseJson.message === 'error')
            setError('La simulación no pudo ser realizada.')
        else
            setError('Simulacion realizada con éxito.')
    }


    return(
        <div className='titulos'>
            <div className='reporteS'>
                <h2 style={{textAlign: 'center'}}>Simular vista de contenido.</h2>
                <div className='fechas'>
                    <div className='fecha'>
                        <h3>Fecha de la simulacion</h3>
                        <input type='date' className='inputTF' onChange={(e) => {fecha.current = e.target.value}}/>
                    </div>
                    <div className='fecha'>
                    <h3>Cantidad de simulaciones</h3>
                    <input className='cantidadSimulaciones' onChange={(e) => {cantidad.current = e.target.value}}/>
                    </div>
                    <button className='confir' onClick={fetchTop10gen}>Confirmar simulación</button>
                </div>
                {error !== '' &&<p style={{marginLeft: '18px', color: `${error.includes('no') ? 'red' : 'green' }`}}>{error}</p>}
            </div>
        </div>
        
    )
}


export default Simulacion