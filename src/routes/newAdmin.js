import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import md5 from 'md5'
import './newAdmin.css'

const NewAdimn = () => {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleAdmin = (e) => {
        setAdmin(e.target.value)
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }

    const createAdmin = async () => {
        const url = 'http://127.0.0.1:5000/api/newAdmin'

        if (admin !== '' && pass !== ''){
            const response = await fetch(url, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    usuario : admin,
                    contrasena: md5(pass),
                })
            })
            const responseJSON = await response.json()
            if (responseJSON.message === 'error') {
                setError('Error, el administrador ya existe.')
            } else {
                setSuccess('Has creado al nuevo administrador.')
                setAdmin('')
                setPass('')
                setTimeout(() => {
                    navigate('/adminHome')
                }, 2000)
            }
        } else {
            setError('Ingresa todos los datos.')
        }
    }

    return (
        <div className='containerNewadmin'>
            <div className="headercito1">
              <div className="regreso" onClick={() => navigate('/adminHome')} />
            </div>
            <div className="fondo">
                <div style={{display: 'flex',flexGrow: '1', alignItems: 'center', fontSize: '24px', fontWeight: 'bold'}}>
                    Crea un nuevo administrador
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '0.7'}}>
                    <input value={admin} placeholder='Usuario' className = 'correito' onChange = {handleAdmin} />
                    <input value={pass} placeholder='Contraseña' type="password" className = 'correito' onChange = {handlePass} />
                    {error !== '' && <p style={{color:'red'}}>{error}</p>}
                    {success !== '' && <p style={{color:'#05183C'}}>{success}</p>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '0.4'}}> 
                    <button onClick={createAdmin} style={{cursor: 'pointer', fontSize: '15px', height: '45px', width: '100px', borderRadius: '10px', backgroundColor: 'white'}}>
                        Crear
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewAdimn
