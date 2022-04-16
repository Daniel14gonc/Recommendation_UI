import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminCuenta.css'

const AdminCuenta = () => {
  const navigate = useNavigate()
  const url = 'http://127.0.0.1:5000/api/ajustecuenta'

  const [tipo, setTipo] = useState(null)
  const [tipoactivo, setTipoactivo] = useState([false, false, false])

  const fetchTipo = async() =>{
    const response = await fetch(url, {
      method:'GET',
      headers: {
        'correo' : JSON.parse( window.sessionStorage.getItem('user')).correo
      }
    })
        
    const responseJson = await response.json()
    return await responseJson
  }

  

  const fetchNuevoTipo = async() =>{
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'tipo': tipo,
        'correo': JSON.parse(window.sessionStorage.getItem('user')).correo,
      })
    })
    navigate('/home')
  } 

  const regresoHome = () => {
    navigate('/home')
  }

  const handleRadio = (event) => {
    handleButtons(event.target.value)
  }

  const handleButtons = (name) => {
    if(name === 'basica'){
      setTipoactivo([true , false, false])
      setTipo(name) 
    }
    if(name === 'estandar'){
      setTipoactivo([false , true, false])
      setTipo(name) 
    }
    if(name === 'avanzada') {
      setTipoactivo([false , false, true])
      setTipo(name) 
    }
  }

  useEffect( () => { async function cambioTipo() { 
      
    const response = await fetchTipo()
    await setTipo(response.tipo)
    
    if(response['tipo'] ==='basica'){
      setTipoactivo([true, false, false])
    }else if(response['tipo'] ==='estandar'){
      setTipoactivo([false, true, false])
    }else{
      setTipoactivo([false, false, true])
    }
  } 
  cambioTipo()
}, [])

  const cuenta = JSON.parse(window.sessionStorage.getItem('user')).correo

    return(
        <div className="containeradCuenta">
          <div className="headercito1"><div className="regreso" onClick={()=> regresoHome()}/></div>
          <div className='fondo'>
            <div className="adCuenta">
              <p className="texto">{cuenta}</p>
            </div>
            <div className='accountholder1'>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'basica' value='basica' checked = {tipoactivo[0]} onChange = {handleRadio} />
                  <label for = 'basica'>Basica</label> 
                </div>
                <a>1 perfil</a>
              </div>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'estandar' value='estandar' checked = {tipoactivo[1]} onChange = {handleRadio}/>
                  <label for = 'estandar'>Estandar</label>
                </div>
                <a>4 perfiles</a>
              </div>
              <div className='acctype1'>
                <div>
                  <input type = 'radio' id = 'avanzada' value='avanzada' checked = {tipoactivo[2]} onChange = {handleRadio}/>
                  <label for = 'acanzada'>Avanzada</label>
                </div>
                <a>8 perfiles</a> 
              </div>
            </div>
            <button className='adConfirmar' onClick={fetchNuevoTipo}>Aplicar cambios</button>
          </div>
        </div>
    )

}

export default AdminCuenta