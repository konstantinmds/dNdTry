import React from 'react'
import { FileExplorer } from './FileExplorer'
import './Sidebar.css'

interface SidebrProps {
  navLists: any
}

const Sidebar = (navLists: SidebrProps) => {
  return (
    <div className="sidebar">
      <FileExplorer navLists={navLists} />
    </div>
  )
}
export default Sidebar
