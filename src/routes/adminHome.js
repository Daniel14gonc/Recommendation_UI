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

  const Cuentas = () => {

    return(
        <div> 
            <div>
                
            </div> 
        </div>
    )
  }

const AdminHome = () => {

    const navigate = useNavigate()
    const [desp, setDesp] = useState(false)




    const changeDesp = () => {
        setDesp(!desp)
    }

    const cerrarSesion = () => {
        window.sessionStorage.clear()
        navigate('/')
      }

    return (
        <div className="containerHome">
            <Header onChange={changeDesp} desp ={desp} Cerrarsesion ={cerrarSesion}/>
            <div className="adminBody">

            </div>
        </div>
    )
}

export default AdminHome