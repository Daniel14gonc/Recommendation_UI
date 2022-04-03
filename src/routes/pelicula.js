import './pelicula.css'

const Pelicula = () => {

    const link = window.sessionStorage.getItem('pelicula')
    console.log(link)

    return (
        <div className='containerPelicula'>
            <div className='headerPelicula'>
                <div></div>
            </div>
            <div className='filmHolder' style={{backgroundImage:`url(${link})`, backgroundSize:'100% 100%'}}>
                <div></div>
            </div>
            <div>
                <div>Boton 1</div>
                <div>Like</div>
            </div>
        </div>
    )
}

export default Pelicula