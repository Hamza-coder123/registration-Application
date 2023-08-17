import React from 'react'
import Header from "./components/Header"
import "./App.css"
import "./index.css"
import Main from './components/Main'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Result from "./components/Result"
import Layout from 'antd/es/layout/layout'
import Download from "./components/Download"

function App  ()  {
  return (
    <div>
      
      <Header />
      <Routes>
        <Route path="/Download" element={<Download />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    
     
        
    
       
     </div>


  )
}

export default App