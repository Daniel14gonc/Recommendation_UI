import { useState, useEffect, useRef, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import './adminHome.css'


const Header = ({onChange, desp, Cerrarsesion, opt}) =>{
    return(
        <div className='adminHeader'>
            <div style={{marginRight:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div  className='adminbubble' onClick={onChange}></div>
                {desp && 
                <div className='admindropdown'>
                    <div className='adminswitch' style={{color:'#4e91dd'}}>Admin</div>
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

const Cuenta = ({ correo, activo, setearcorreo, edita, onChangy, change, index, clicky, cambiar}) => {
    return(
    <tr>
        {
        !edita ?
        <Fragment>
            <td>{correo}</td> 
            <td><button className='botonEdit' onClick={clicky}>Editar</button></td>
            {activo ? <td><button className='botonBaja' onClick={()=>{setearcorreo(correo, change)}}>Dar de baja</button></td> : <td><button className='botonActivo' onClick={()=>{setearcorreo(correo, change)}}>Activar cuenta</button></td>}
        </Fragment> :
        <Fragment>
            <td><input type="text" defaultValue={correo} style={{textAlign:'center'}} className={'inputMail'} onChange={(e) => onChangy(e, index)} /></td> 
            <td><button onClick={cambiar} className='botonEdit' style={{backgroundColor:'rgb(81, 209, 8)'}}>Listo</button></td>
            {activo ? <td><button className='botonBaja' onClick={()=>{setearcorreo(correo, change)}}>Dar de baja</button></td> : <td><button className='botonActivo' onClick={()=>{setearcorreo(correo, change)}}>Activar cuenta</button></td>}
        </Fragment>
        }
    </tr>
    )
}

const Cuentas = ({ cuentas,setearcorreo, change}) => {
    const [edita, setEdita] = useState(cuentas.map(() => false))
    const corrs = useRef(cuentas.map((elementos) => elementos.correo))

    const clicky = (index) =>{
        const viejo = [...edita]
        viejo[index] = true
        setEdita(viejo)
    } 


    const handleChangy = (event, index) => {
        corrs.current[index] = event.target.value
    }

    const cambiar = async (index, correo) => {
        const url = 'http://127.0.0.1:5000/api/cuentas';
        const response = await fetch(url, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            new : corrs.current[index],
            old : correo
          })
        })
       const viejin = [...edita]
        
            
        const responseJson = await response.json()
        viejin[index] = false
        setEdita(viejin)
        change()
        return await responseJson
    }

return(
    <div className='titulos'>
        <div className='TitleS'>
                <h1>Cuentas</h1>
            </div>
        <table>
            <thead>
                <tr>
                <th>Correo</th>
                <th>Editar usuario</th>
                <th>Modificar estado</th>
                </tr>
            </thead>
            <tbody>
                {cuentas.map((elements, index) => {
                    return (
                        <Cuenta index ={index} correo={elements.correo} activo={elements.activo} setearcorreo={setearcorreo} change={change} clicky = {() => clicky(index)} onChangy={handleChangy} cambiar = {() => cambiar(index, elements.correo)} edita = {edita[index]}/>
                    )
                })}
            </tbody>
        </table>
    </div>
    
)
}



const Estrella = ({ change, nombre, edit, click, onChange, index }) => {
    return(
    <tr>
        {
            !edit ?
            <Fragment>
                <td>{nombre}</td> 
                <td><button onClick={click} className='botonEdit' >Editar</button></td>
            </Fragment> :

            <Fragment>
            <td><input type="text" defaultValue={nombre} style={{textAlign:'center'}} className={'inputStar'} onChange={(e) => onChange(e, index)} /></td> 
            <td><button onClick={change} className='botonEdit' style={{backgroundColor:'rgb(81, 209, 8)'}}>Listo</button></td>
        </Fragment> 
            
        }
        
    </tr>
    )
}

const Estrellas = ({ estrellas, change }) =>{
    const [edit, setEdit] = useState(estrellas.map(() => false))
    const star = useRef(estrellas.map((elements)=> elements.nombre))

    const click = (index) => {
        console.log(edit)
        const old = [...edit]
        old[index] = true
        setEdit(old)
    }

    const listo = async (index, id) => {
        const url = 'http://127.0.0.1:5000/api/stars';
        const response = await fetch(url, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            nombre : star.current[index],
            id : id
          })
        })
       const old = [...edit]
        
            
        const responseJson = await response.json()
        old[index] = false
        setEdit(old)
        change()
        return await responseJson
    }

    const handleChange = (event, index) => {
        star.current[index] = event.target.value
    }

    return(
        <div className='titulos'>
            <div className='TitleS'>
                <h1>Estrellas</h1>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Editar nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {estrellas.map((elements, index) => {
                        return (
                            <Estrella nombre={elements.nombre} edit={edit[index]} click = {() => click(index)} onChange={handleChange} index={index} change={()=>listo(index, elements.id)} id={elements.id}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

const Anunciante = ({nombre, index, onChange, change, edite, click, cambio}) =>{
    
    const borrar = async() => {
        const url = 'http://127.0.0.1:5000/api/anunciante';
        const response = await fetch(url, {
          method:'DELETE',
          headers:{
            'nombre': nombre
        }
        })

        cambio()
    }

    return(
        <tr>
            {!edite ?
            <Fragment>
                <td>{nombre}</td> 
                <td><button className='botonEdit' onClick={click}>Editar</button></td>
                <td><button className='botonEliminar' onClick={borrar}>Eliminar</button></td>
            </Fragment> :
            <Fragment>
                <td><input type="text" defaultValue={nombre} style={{textAlign:'center'}} className={'inputStar'} onChange={(e) => onChange(e, index)} /></td> 
                <td><button onClick={change} className='botonEdit' style={{backgroundColor:'rgb(81, 209, 8)'}}>Listo</button></td>
                <td><button className='botonEliminar'>Eliminar</button></td>
            </Fragment>
            }
        </tr>
        )
}


const Anunciantes = ({anunciantes, change}) =>{
    const [edite, setEdite] = useState(anunciantes.map(() => false))
    const noms = useRef(anunciantes.map((elementos) => elementos.nombre))

    const clicki = (index) =>{
        const old = [...edite]
        old[index] = true
        setEdite(old)
    }

    const cambia = async (index, nombre) => {
        const url = 'http://127.0.0.1:5000/api/anunciante';
        const response = await fetch(url, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            new : noms.current[index],
            old : nombre
          })
        })
       const old = [...edite]
        
            
        const responseJson = await response.json()
        old[index] = false
        setEdite(old)
        change()
        return await responseJson
    }


    const handleChangne = (event, index) =>{
        noms.current[index] = event.target.value
    }

    return(
        <div className='titulos'>
            <div className='Title'>
                <h1>Anunciantes</h1>
                <button>Crear nuevo</button>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Editar nombre</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {anunciantes.map((elements, index) => {
                        return (
                            <Anunciante nombre={elements.nombre} index = {index} onChange={handleChangne} change={()=>{cambia(index, elements.nombre)} } click = {() => {clicki(index)}} cambio={change} edite={edite[index]}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )

}

const Anuncio = ({ id, anunciantes, anunciante, changes }) =>{
    const anun = useRef(anunciante)

    const change = (event) => {
        anun.current = event.target.value
    }

    const onClick = async() => {
        const url = 'http://127.0.0.1:5000/api/anuncios';
        const response = await fetch(url, {
          method:'PUT',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id : id,
              anunciante: anun.current
          })
        })
            
        const responseJson = await response.json()
        change()
        return await responseJson
    }

    const deletion = async() => {
        const url = 'http://127.0.0.1:5000/api/anuncios';
        const response = await fetch(url, {
          method:'DELETE',
          headers:{
              'id': id
          }
        })

        changes()
    }

    return(
        <tr>
            <td>{id}</td> 
            <td>
                <select className='selectAnunciante' onChange={change}>
                    <option value="" selected disabled hidden>{anunciante}</option>
                    {anunciantes.map(
                        (element) => <option value={element.nombre}>{element.nombre}</option>
                    )}
                </select>
            </td>
            <td><button onClick={onClick} className='botonEdit'>Editar</button></td>
            <td><button onClick={deletion} className='botonEliminar'>Eliminar</button></td>
        </tr>
        )
}

const Anuncios = ({anuncios, anunciantes, change }) =>{
    return(
        <div className='titulos'>
            <div className='Title'>
                <h1>Anuncios</h1>
                <button>Crear nuevo</button>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Anunciante</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {anuncios.map((elements) => {
                        return (
                            <Anuncio id={elements.id} anunciantes={anunciantes} anunciante={elements.anunciante} changes={change} />
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
    const navigate = useNavigate()
    return(
        <div className='titulos'>
             <div className='Title'>
                <h1>Contenido</h1>
                <button onClick={() => navigate('/newmovie')}>Crear nuevo</button>
            </div>
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


const fetchEstrellas = async() =>{
    const url = 'http://127.0.0.1:5000/api/admin_getEstrellas';
    const response = await fetch(url, {
      method:'GET'
    })
        
    const responseJson = await response.json()
    return await responseJson
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

    const fetchActivado = async(a) =>{
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
        await a()
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
        fetchActivado(a)
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
        setClikk(!clikk)

    }


    return (
        <div className="adminContainer">
            <Header onChange={changeDesp} desp ={desp} Cerrarsesion ={cerrarSesion} opt={opt}/>
            <div className="adminBody">
                    {opciones[0] && <Cuentas cuentas={cuentas} setearcorreo={setearcorreo} change={() => setClikk(!clikk)}/>}
                    {opciones[1] && <Estrellas estrellas={estrellas} change={() => setClikk(!clikk)} />}
                    {opciones[2] && <Contenidos contenidos={contenidos}/>}
                    {opciones[3] && <Anuncios anuncios={anuncios} anunciantes={anunciantes} change={() => setClikk(!clikk)} />}
                    {opciones[4] && <Anunciantes anunciantes={anunciantes} change={() => setClikk(!clikk)}/> }
                
            </div>
        </div>
    )
}

export default AdminHome