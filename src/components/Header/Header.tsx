import React from 'react'
import "./Header.css"

interface IMyProps {
  data: any
}

export const Header: React.FC<IMyProps> = ({ data }: IMyProps) => {
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <div className="header">
      <p>...</p>
    </div>
  )
}

export default Header
