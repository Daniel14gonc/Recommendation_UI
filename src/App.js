import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Logon from './routes/logon.js'
import Perfiles from './routes/perfiles';
import Home from './routes/home';
import AdminCuenta from './routes/adminCuenta';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/logon" exact element={<Logon />} />
        <Route path="/perfiles" exact element={<Perfiles />} />
        <Route path='/home' exact element ={<Home/>}/>
        <Route path='/adminCuenta' exact element ={<AdminCuenta/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
