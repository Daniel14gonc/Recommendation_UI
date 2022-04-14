import { Outlet, Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import md5 from 'md5'

const url = 'http://127.0.0.1:5000/api/signinAdmin';



const AdminLogin = () => {

  const[correo, setCorreo] = useState(null)
  const[password, setPassword] = useState(null)
  const [valido, setValido] = useState(true)
  const [cont, setCont] = useState(0)

  const navigate = useNavigate()
  const ir = (ruta) => {
    console.log(ruta)
    navigate(ruta)
  }

  const getCorreo = (event) => {
    setCorreo(event.target.value);
  }

  const getPassword = (event) => {
    setPassword(md5(event.target.value));
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
      setCont(cont+1)
    }
    else{
      const use = {
        isLoggedIn: true,
        correo: correo
      }
      window.sessionStorage.setItem('user', JSON.stringify(use))
      ir('/adminhome')
    }

  }

  useEffect(() =>{
      const usuario = JSON.parse(window.sessionStorage.getItem('user'))
      if(usuario){
        if(usuario.isLoggedIn){
          const perfil = window.sessionStorage.getItem('perfil')
          if(perfil){
            navigate('/home')
          }
        }
        
      }
    }, [])
  

  return(
    <div className = "container">
      <div className="login-box">
        <h2 className = "placeholder">Inicia sesión como admin</h2>
          <div className='input-container'>
            <input className = "correo" placeholder="Correo Electronico" onChange ={getCorreo} />
            <input type='password' className = "contrasena" placeholder="Contraseña" onChange ={getPassword} />
            <div className='errorContainer'>
              <p className = "errorMessage">{!valido ? `Datos inválidos. Intentos fallidos: ${cont}` : ''}</p>
            </div>
          </div>
          <div className='button-container'>
            <button className = "botonIngresar" onClick={validarRegistro}>Ingresar</button>
          </div>
      </div>
    </div>
  )
}

export default AdminLogin