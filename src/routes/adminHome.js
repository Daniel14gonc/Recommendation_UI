import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminHome.css'


const Header = ({onChange, desp, Cerrarsesion}) =>{
    return(
        <div className='adminHeader'>
            <div style={{marginRight:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div  className='adminbubble' onClick={onChange}></div>
                {desp && 
                <div className='admindropdown'>
                    <div className='adminswitch' style={{color:'#4e91dd'}}>Manuel</div>
                    <div style={{color:'red'}} className='adminswitch' onClick={Cerrarsesion}>Cerrar sesión</div>
                </div>
                }
            </div>
            <div className='pestanas'>
                <div>
                    Cuentas  
                </div>
                <div>
                    Estrellas  
                </div>
                <div>
                    Contenido
                </div>
                <div>
                    Anuncios  
                </div>
                <div>
                    Anunciantes 
                </div>

            </div>
        </div>
    )
  }

  const Cuenta = ({ id, correo }) => {
      return(
        <tr>
            <td>{id}</td>
            <td>{correo}</td> 
            <td><button className='botonEdit'>Editar</button></td>
            <td><button className='botonBaja'>Dar de baja</button></td>
        </tr>
      )
  }

  const Cuentas = ({ cuentas }) => {

    return(
        <div className='cuentas'>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Correo</th>
                    <th>Editar usuario</th>
                    <th>Modificar estado</th>
                    </tr>
                </thead>
                <tbody>
                    {cuentas.map((elements) => {
                        return (
                            <Cuenta id={elements.id} correo={elements.correo} />
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
  }

const AdminHome = () => {

    const navigate = useNavigate()
    const [desp, setDesp] = useState(false)
    const [opciones, setOpciones] = useState([true, false, false, false, false])


    const cuentas = [
        {id: '1', correo: 'algo'},
        {id: '2', correo: 'algo'},
        {id: '3', correo: 'algo'},
        {id: '4', correo: 'algo'},
        {id: '5', correo: 'algo'},
        {id: '6', correo: 'algo'},
        {id: '7', correo: 'algo'},
        {id: '1', correo: 'algo'},
        {id: '2', correo: 'algo'},
        {id: '3', correo: 'algo'},
        {id: '4', correo: 'algo'},
        {id: '5', correo: 'algo'},
        {id: '6', correo: 'algo'},
        {id: '7', correo: 'algo'}
    ]




    const changeDesp = () => {
        setDesp(!desp)
    }

    const cerrarSesion = () => {
        window.sessionStorage.clear()
        navigate('/')
      }

    return (
        <div className="adminContainer">
            <Header onChange={changeDesp} desp ={desp} Cerrarsesion ={cerrarSesion}/>
            <div className="adminBody">
                {opciones[0] && <Cuentas cuentas={cuentas}/>}
                {opciones[1] && <Cuentas />}
                {opciones[2] && <Cuentas />}
                {opciones[3] && <Cuentas />}
                {opciones[4] && <Cuentas />}

            </div>
        </div>
    )
}

export default AdminHome