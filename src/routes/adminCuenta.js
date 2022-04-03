import { useNavigate } from 'react-router-dom'
import './adminCuenta.css'

const AdminCuenta = () => {
  const navigate = useNavigate()

  const regresoHome = () => {
    navigate('/home')
  }

  const cuenta = JSON.parse(window.sessionStorage.getItem('user')).correo

    return(
        <div className="containeradCuenta">
          <div className="regreso" onClick={()=> regresoHome()}/>
          <div className='fondo'>
            <div className="adCuenta">
              <p className="texto">{cuenta}</p>
            </div>
            <div className='accountholder'>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'basica' value='basica'  />
                  <label for = 'basica'>Basica</label> 
                </div>
                <a>1 perfil</a>
              </div>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'estandar' value='estandar' />
                  <label for = 'estandar'>Estandar</label>
                </div>
                <a>4 perfiles</a>
              </div>
              <div className='acctype'>
                <div>
                  <input type = 'radio' id = 'avanzada' value='avanzada'/>
                  <label for = 'acanzada'>Avanzada</label>
                </div>
                <a>8 perfiles</a> 
              </div>
            </div>
            <button className='adConfirmar'>Aplicar cambios</button>
          </div>
        </div>
    )

}

export default AdminCuenta