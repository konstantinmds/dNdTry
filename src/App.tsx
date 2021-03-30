import React from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import * as data from './kls.json'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <Header data={data} />
      <div className="app__body">
        <Main />
      </div>
    </div>
  )
}

export default App
