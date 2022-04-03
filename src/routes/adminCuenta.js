import './adminCuenta.css'

const AdminCuenta = () => {

    return(
        <div className="containeradCuenta">
            <div className="adCuenta"/>
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
            <button className='adConfirmar'/>
        </div>
    )

}

export default AdminCuenta