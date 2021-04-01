import React from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import './App.css'

const App: React.FC<any> = (data) => {
  return (
    <div className="app">
      <Header props={data} />
      <div className="app__body">
        <Main />
      </div>
    </div>
  )
}

export default App
