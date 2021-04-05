/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Select from 'react-select'
import { SelectProps } from '../../styles'

const CustomSelect = ({ options, value, onChange }: SelectProps) => {
  return (
    <div>
      <Select
        options={options as any}
        value={value}
        onChange={onChange}
        menuPortalTarget={document.body}
      />
    </div>
  )
}

export default CustomSelect
