import React from 'react'
import { Header } from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'
import Main from './components/Main/Main'
import * as data from './kls.json'

const App: React.FC = () => {
  return (
    <div className="app">
      <Header data={data} />
      <div className="app__body">
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}

export default App
