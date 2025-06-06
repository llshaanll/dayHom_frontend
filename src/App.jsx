import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import AdminPanel from './pages/Admin/AdminPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/panel' element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App