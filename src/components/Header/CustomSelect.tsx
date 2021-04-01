/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Select, { ValueType } from 'react-select'

const options = [
  {
    label: 'Metadata Refresh v2',
    value: 'Metadata Refresh v2',
  },
  {
    label: 'Metadata Refresh (Snowflake)',
    value: 'Metadata Refresh (Snowflake)',
  },
  {
    label: 'Metadata Refresh (AzureSQL)',
    value: 'Metadata Refresh (AzureSQL)',
  },
]


const CustomSelect = (props) => {
  return (
    <div>
      <Select options={options} 
      menuPortalTarget={document.body} 
     />
    </div>
  )
}

export default CustomSelect
