import './login.css'
import { createBrowserHistory as history} from 'history';
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom"
import History from './History';
import Cookies from 'universal-cookie';

const Login = () => {

  let navigate = useNavigate();
  const ir = () => {
    const cookies = new Cookies()
    cookies.set('idUsuario', '1', {path: '/'});
    navigate('/logon')
  }
    
  return(
    <div className = "container">
      <div className="login-box">
        <h2 className = "placeholder">Login</h2>
          <div className='input-container'>
            <input className = "correo" placeholder="Correo Electronico"/>
            <input className = "contrasena" placeholder="Contraseña"/>
          </div>
          <div className='button-container'>
            <button className = "botonIngresar">Ingresar</button>
            <button className = "botonRegistro" onClick={ir}>Registro</button>
          </div>
      </div>
    </div>
  )
}

export default Login