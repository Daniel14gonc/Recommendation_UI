import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Logon from './routes/logon.js'
import Perfiles from './routes/perfiles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(() => JSON.parse(window.sessionStorage.getItem('user')) || {})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login user = {user} setUser={setUser}/>} />
        <Route path="/logon" exact element={<Logon />} />
        <Route path="/perfiles" exact element={<Perfiles />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
