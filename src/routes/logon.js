import './logon.css'
import Cookies from 'universal-cookie';

const Logon = () => {

  const cookies = new Cookies()
  const temp = cookies.get('idUsuario')

  return(
      <div className = "container">
        <h1>{temp}</h1>
      </div>
    )
  }
  
export default Logon