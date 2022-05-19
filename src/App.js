import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Logon from './routes/logon.js'
import Perfiles from './routes/perfiles';
import Home from './routes/home';
import AdminCuenta from './routes/adminCuenta';
import Pelicula from './routes/pelicula';
import AdminLogin from './routes/adminLogin';
import NewMovie from './routes/newMovies';
import NewAnunciante from './routes/newAnunciante';
import AdminHome from './routes/adminHome';
import NewAnuncio from './routes/newAnuncio';
import NewAdimn from './routes/newAdmin';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import EditMovie from './routes/editarPelicula';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/logon" exact element={<Logon />} />
        <Route path="/perfiles" exact element={<Perfiles />} />
        <Route path='/home' exact element ={<Home/>}/>
        <Route path='/adminCuenta' exact element ={<AdminCuenta/>}/>
        <Route path='/pelicula' exact element ={<Pelicula />}/>
        <Route path='/adminLogin' exact element ={<AdminLogin />}/>
        <Route path='/adminhome' exact element ={<AdminHome />}/>
        <Route path='/newmovie' exact element ={<NewMovie />}/>
        <Route path='/newanunciante' exact element ={<NewAnunciante />}/>
        <Route path='/newanuncio' exact element ={<NewAnuncio />}/>
        <Route path='/editPelicula' exact element={<EditMovie/>}/>
        <Route path='/newAdmin' exact element={<NewAdimn />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
