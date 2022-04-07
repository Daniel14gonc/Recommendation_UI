import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminHome.css'


const Header = ({onChange, desp, Cerrarsesion, opt}) =>{
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
                <div onClick={()=>opt('cuentas')}>
                    Cuentas  
                </div>
                <div onClick={()=>opt('estrellas')}>
                    Estrellas  
                </div>
                <div onClick={()=>opt('contenido')}>
                    Contenido
                </div>
                <div onClick={()=>opt('anuncios')}>
                    Anuncios  
                </div>
                <div onClick={()=>opt('anunciantes')}>
                    Anunciantes 
                </div>

            </div>
        </div>
    )
  }

const Cuenta = ({ correo, activo, setearcorreo, clikk}) => {
    return(
    <tr>
        <td>{correo}</td> 
        <td><button className='botonEdit'>Editar</button></td>
        {activo ? <td><button className='botonBaja' onClick={()=>{setearcorreo(correo, !clikk)}}>Dar de baja</button></td> : <td><button className='botonActivo' onClick={()=>{setearcorreo(correo, !clikk)}}>Activar cuenta</button></td>}
    </tr>
    )
}

const Cuentas = ({ cuentas,setearcorreo, setClikk, clikk}) => {
return(
    <div className='titulos'>
        <table>
            <thead>
                <tr>
                <th>Correo</th>
                <th>Editar usuario</th>
                <th>Modificar estado</th>
                </tr>
            </thead>
            <tbody>
                {cuentas.map((elements) => {
                    return (
                        <Cuenta correo={elements.correo} activo={elements.activo} setearcorreo={setearcorreo} setClikk={setClikk} clikk={clikk}/>
                    )
                })}
            </tbody>
        </table>
    </div>
    
)
}


const Estrella = ({ nombre  }) => {
    return(
    <tr>
        <td>{nombre}</td> 
        <td><button className='botonEdit'>Editar</button></td>
    </tr>
    )
}

const Estrellas = ({estrellas}) =>{
    return(
        <div className='titulos'>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Editar nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {estrellas.map((elements) => {
                        return (
                            <Estrella nombre={elements.nombre} />
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

const Anunciante = ({nombre}) =>{
    return(
        <tr>
            <td>{nombre}</td> 
            <td><button className='botonEdit'>Editar</button></td>
            <td><button className='botonEliminar'>Eliminar</button></td>
        </tr>
        )
}
const Anunciantes = ({anunciantes}) =>{
    return(
        <div className='titulos'>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Editar nombre</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {anunciantes.map((elements) => {
                        return (
                            <Anunciante nombre={elements.nombre} />
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )

}

const Anuncio = ({id, anunciante}) =>{
    return(
        <tr>
            <td>{id}</td> 
            <td>{anunciante}</td>
            <td><button className='botonEdit'>Editar</button></td>
            <td><button className='botonEliminar'>Eliminar</button></td>
        </tr>
        )
}
const Anuncios = ({anuncios}) =>{
    return(
        <div className='titulos'>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Link</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {anuncios.map((elements) => {
                        return (
                            <Anuncio id={elements.id} anunciante={elements.anunciante}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )

}


const Contenido = ({nombre}) =>{
    return(
        <tr>
            <td>{nombre}</td> 
            <td><button className='botonEdit'>Editar</button></td>
            <td><button className='botonEliminar'>Eliminar</button></td>
        </tr>
        )
}
const Contenidos = ({contenidos}) =>{
    return(
        <div className='titulos'>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {contenidos.map((elements) => {
                        return (
                            <Contenido nombre={elements.nombre} />
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )

}
const AdminHome = () => {

    const fetchCuentas = async() =>{
        const url = 'http://127.0.0.1:5000/api/admin_getCuenta';
        const response = await fetch(url, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchEstrellas = async() =>{
        const url = 'http://127.0.0.1:5000/api/admin_getEstrellas';
        const response = await fetch(url, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchAnunciantes = async() =>{
        const url3 = 'http://127.0.0.1:5000/api/admin_getAnunciantes';
        const response = await fetch(url3, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchAnuncios = async() =>{
        const url3 = 'http://127.0.0.1:5000/api/admin_getAnuncios';
        const response = await fetch(url3, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchContenidos = async() =>{
        const url3 = 'http://127.0.0.1:5000/api/admin_getCont';
        const response = await fetch(url3, {
          method:'GET'
        })
            
        const responseJson = await response.json()
        return await responseJson
    }

    const fetchActivado = async(setClikk, a) =>{
        const url = 'http://127.0.0.1:5000/api/admin_Activado';
        const response = await fetch(url, {
          method:'PUT',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'correo': correo.current
          })
        })
            
        const responseJson = await response.json()
        await setClikk(a)
        return await responseJson
    }

    const navigate = useNavigate()
    const [desp, setDesp] = useState(false)
    const [opciones, setOpciones] = useState([true, false, false, false, false])
    const [cuentas, setCuentas] = useState([])
    const [estrellas, setEstrellas] = useState([])
    const [contenidos, setContenidos] = useState([])
    const [anunciantes, setAnunciantes] = useState([])
    const [anuncios, setAnuncios] = useState([])
    const [clikk, setClikk] = useState(false)
    const correo = useRef(null)
 


    useEffect( () => { async function admincito() { 
        const response = await fetchCuentas()
        await setCuentas(response)
        const response1 = await fetchEstrellas()
        await setEstrellas(response1)
        const response2 = await fetchAnunciantes()
        await setAnunciantes(response2)
        const response3 = await fetchAnuncios()
        await setAnuncios(response3)
        const response4 = await fetchContenidos()
        await setContenidos(response4)
      } 
      admincito()
    }, [clikk])


    const changeDesp = () => {
        setDesp(!desp)
    }

    const cerrarSesion = () => {
        window.sessionStorage.clear()
        navigate('/')
      }

    const setearcorreo = (corr, a) =>{
        correo.current = corr
        fetchActivado(setClikk, a)
    }

    const opt = (algo)=>{

        if(algo==='cuentas'){
            setOpciones([true, false, false, false, false])
        }
        else if(algo==='estrellas'){
            setOpciones([false, true, false, false, false])
        }
        else if(algo==='contenido'){
            setOpciones([false, false, true, false, false])
        }
        else if(algo==='anuncios'){
            setOpciones([false, false, false, true, false])
        }
        else if(algo==='anunciantes'){
            setOpciones([false, false, false, false, true])
        }

    }


    return (
        <div className="adminContainer">
            <Header onChange={changeDesp} desp ={desp} Cerrarsesion ={cerrarSesion} opt={opt}/>
            <div className="adminBody">
                    {opciones[0] && <Cuentas cuentas={cuentas} setearcorreo={setearcorreo} clikk={clikk}/>}
                    {opciones[1] && <Estrellas estrellas={estrellas}/>}
                    {opciones[2] && <Contenidos contenidos={contenidos}/>}
                    {opciones[3] && <Anuncios anuncios={anuncios}/>}
                    {opciones[4] && <Anunciantes anunciantes={anunciantes}/>}
                
            </div>
        </div>
    )
}

export default AdminHome