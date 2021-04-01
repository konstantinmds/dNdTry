import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import App from './App'
import { AppStateProvider } from './AppStateContext'
import * as data from './klp.json'

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <AppStateProvider>
      <App data={data} />
    </AppStateProvider>
  </DndProvider>,
  document.getElementById('root')
)
