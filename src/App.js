import { Route, Routes, Navigate } from 'react-router-dom';
import Ticket from './components/Ticket';
import './App.css';
import { useEffect } from 'react';
const App = () => {
  let id = Math.floor(Math.random() * 224) + 1;
  return (
    <div className="App">
      <Routes>
        <Route path="/advice/:id" element={<Ticket />} />
        <Route path="/advice/" element={<Ticket />} />
        <Route path="*" element={<Navigate to={"/advice/" + id} />} />
      </Routes>
    </div>
  );
}

export default App;
