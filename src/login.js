import './login.css'
import { createBrowserHistory as history} from 'history';
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react';

const url = 'http://127.0.0.1:5000/api/signin';


const Login = ({user, setUser}) => {

  const[correo, setCorreo] = useState(null)
  const[password, setPassword] = useState(null)
  const [valido, setValido] = useState(true)

  const navigate = useNavigate();
  const ir = () => {
    navigate('/logon')
  }

  const getCorreo = (event) => {
    setCorreo(event.target.value);
  }

  const getPassword = (event) => {
    setPassword(event.target.value);
  }

  const validarRegistro = async() => {
    const response = await fetch(url, {
      method:'GET',
      headers: {
        'correo' : correo,
        'password' : password
      }
    })
    
    const responseJson = await response.json()
    if (responseJson['message'].includes('error')){
      setValido(false)
    }
    else{
      const use = {
        isLoggedIn: true,
        correo: correo
      }
      setUser(use)
      window.sessionStorage.setItem('user', JSON.stringify(use))
      ir()
    }

  }

  if(user.isLoggedIn){
    navigate('/logon')
  }

  return(
    <div className = "container">
      <div className="login-box">
        <h2 className = "placeholder">Inicia sesión</h2>
          <div className='input-container'>
            <input className = "correo" placeholder="Correo Electronico" onChange ={getCorreo} />
            <input className = "contrasena" placeholder="Contraseña" onChange ={getPassword} />
            <div className='errorContainer'>
              <p className = "errorMessage">{!valido ? 'Datos inválidos. Intenta de nuevo.' : ''}</p>
            </div>
          </div>
          <div className='button-container'>
            <button className = "botonIngresar" onClick={validarRegistro}>Ingresar</button>
            <button className = "botonRegistro" onClick={ir}>Registrarse</button>
          </div>
      </div>
    </div>
  )
}

export default Login