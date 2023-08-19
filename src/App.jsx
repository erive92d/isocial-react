import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home';
import Signup from './pages/Signup'
import Profile from './pages/Profile';
import Logo from './components/Headers/Logo'
import Header from './components/Headers/Header';
import ViewPost from './pages/ViewPost';
import SearchUser from './components/Headers/SearchUser';

function App() {

  return (

    <div className='min-h-screen bg-gray-200'>
      <Router>
        <div className=' bg-blue-600 text-white'>

          {/* <SearchUser /> */}
          <Header />

        </div>

        <div className='text-gray-800'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/me" element={<Profile />} />
          </Routes>

        </div>
      </Router>
    </div>



  )
}

export default App
