import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './logon.css'
const url = 'http://127.0.0.1:5000/api/logon';

const Logon = () => {

  const [correo, setCorreo] = useState(null)
  const [contrasena, setContra] = useState(null)
  const [conf, setConf] = useState(null)
  const [valid, setValid] = useState(true)

  const cuenta = useRef(null)
  const message = useRef(null)

  const navigate = useNavigate()

  const [button1, setButton1] = useState([false, false, false])

  const handleButtons = (name) => {
    cuenta.current = name
    if(name === 'basica'){
      setButton1([true , false, false]) 
    }
    if(name === 'estandar'){
      setButton1([false , true, false]) 

    }
    if(name === 'avanzada') {
      setButton1([false , false, true]) 

    }
  }

  const handleCorreo = (event) =>{
    setCorreo(event.target.value)
  }

  const handleContra = (event) =>{
    setContra(event.target.value)
  }

  const handleConf = (event) => {
    setConf(event.target.value)
  }
  
  const handleRadio = (event) => {
    handleButtons(event.target.value)
  }
  
  const ingresarRegistro = async() => {
    const temp = button1.filter(element => element === true)
    if((correo) && (contrasena) && (conf) && temp.length !== 0){
      if(conf !== contrasena){
        message.current = 'Las contraseñas no coinciden.'
        setValid(false)
      } else {
        const response = await fetch(url, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            correo : correo,
            password: contrasena,
            tipo : cuenta.current
          })
        })
        
        const responseJson = await response.json()

        if (responseJson['message'].includes('error')){
          message.current = 'Correo ya existente.'
          setValid(false)
        }
        else{
          const use = {
            isLoggedIn: true,
            correo: correo
          }
          window.sessionStorage.setItem('user', JSON.stringify(use))
          navigate('/perfiles')
        }
        
      }
    } else {
      message.current = 'Ingresa todos los valores.'
      setValid(false)
    }
    
  }

  return(
      <div className = "container">
        <div className='logon-box'>
          <h2 className='placeholder'>Crear Cuenta</h2>
          <div className = 'inputfields'>
            <input placeholder='Correo electronico' className = 'correo' onChange = {handleCorreo} />
            <input placeholder='Contraseña' type="password" className = 'correo' onChange = {handleContra} />
            <input placeholder='Confirma tu Contraseña' type="password" className = 'correo' onChange = {handleConf}/>
            <div className = "error">
              <p>{!valid ? message.current : ''}</p>
            </div>
            <div className='accountholder'>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'basica' value='basica' checked = {button1[0]} onChange ={handleRadio}  />
                  <label for = 'basica'>Basica</label> 
                </div>
                <a>1 perfil</a>
              </div>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'estandar' checked = {button1[1]} value='estandar' onChange ={handleRadio} />
                  <label for = 'estandar'>Estandar</label>
                </div>
                <a>4 perfiles</a>
              </div>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'avanzada' value='avanzada' checked = {button1[2]} onChange ={handleRadio} />
                  <label for = 'acanzada'>Avanzada</label>
                </div>
                <a>8 perfiles</a> 
              </div>
            </div>
          </div>
          <button className = "botonIngresar" onClick={ingresarRegistro} >Crear Cuenta</button>
        </div>
      </div>
    )
  }
  
export default Logon