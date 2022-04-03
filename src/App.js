import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Logon from './routes/logon.js'
import Perfiles from './routes/perfiles';
import Home from './routes/home';
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
      </Routes>
    </BrowserRouter>
  )
}

export default App;
