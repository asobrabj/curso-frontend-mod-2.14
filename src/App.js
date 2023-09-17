import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form_1 from './components/Form_1';
import Form_2 from './components/Form_2';
import { AppProvider } from './AppState'; 

import './css/Navbar.css';

function App() {
  return (
    <AppProvider> 
      <Router>
        <div>
          <div className="navbar">
            <Link to="/">Formulario Simples</Link>
            <Link to="/Form_2">Formulário com Validação</Link>
          </div>
          <Routes>
            <Route path="/" element={<Form_1 />} />
            <Route path="/Form_2" element={<Form_2 />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
