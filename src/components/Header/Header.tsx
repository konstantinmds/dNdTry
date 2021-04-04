/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import React from 'react'
import CustomSelect from './CustomSelect'
import './Header.css'

/* 
import Select, { ValueType } from 'react-select'
import { OptionsType } from '../../styles'


interface IMyProps {
  data: any
}
 */

/* const handleClick = (e: ValueType<OptionsType, boolean>) => {
  if (!e) {
    return null
  }
  console.log(e)
  return e
}
 */
/** @type {{search: React.CSSProperties}} */
const styles = {
  app: {
    backgroundColor: '#EBECF0',
    justifyItems: 'center',
    alignItems: 'center',
    display: 'grid',
    height: '20px',
    borderRadius: '2em',
    color: '#172B4D',
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  },
  select: {
    width: '40%',
    'marginLeft': 'auto',
  },
  // after z index problem, went here !
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}

const Header: React.FC<any> = (props: any) => {
  console.log(props)
  return (
    <div className="header">
      <div style={styles.select as React.CSSProperties}>
        <CustomSelect />
      </div>
    </div>
  )
}

export default Header
