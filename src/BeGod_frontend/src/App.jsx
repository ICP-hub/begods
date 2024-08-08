import { useState } from 'react';
import { BeGod_backend } from '../../declarations/BeGod_backend';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Admin from './Admin/Admin';

function App() {


  return (
    <main className='max-w-[1920px] mx-auto'>
      <Router>
        <Routes>
          <Route path='/Admin/*' element={<Admin />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
