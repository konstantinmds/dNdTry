/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react'
import Select, { ValueType } from 'react-select'
import { useAppState } from '../../AppStateContext'
import { OptionsType, ButtonRed } from '../../styles'
import { ingestData } from '../../api'
import './Header.css'

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
    marginLeft: 'auto',
  },
  // after z index problem, went here !
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}

const Header: React.FC<any> = () => {
  const { state, dispatch } = useAppState()

  const [selectedOption, setSelectedOption] = useState<
    ValueType<OptionsType, boolean>
  >({ value: '', label: '' } as OptionsType)

  const handleIngest = async () => {
    const data = await ingestData()
    dispatch({
      type: 'ADD_INGESTED',
      payload: { text: data, taskId: 'Code Cells' },
    })
  }

  const handleChange = async (e: ValueType<OptionsType, boolean>) => {
    const valuesFrom = (e as OptionsType).value

    setSelectedOption({
      value: valuesFrom,
      label: valuesFrom,
    })

    dispatch({
      type: 'CHANGE_PROJECT',
      payload: { text: valuesFrom, taskId: 'Choose Project' },
    })
  }

  return (
    <div className="header">
      <ButtonRed onClick={() => handleIngest()}>
        Import Project Impact Check
      </ButtonRed>
      <ButtonRed>Import Project</ButtonRed>
      <div style={styles.select as React.CSSProperties}>
        <Select
          options={state.dropDownItems as any}
          value={selectedOption as any}
          onChange={(e: ValueType<OptionsType, boolean>) =>
            handleChange(({
              value: ((e as unknown) as any).value,
              label: ((e as unknown) as any).label,
            } as unknown) as any)
          }
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  )
}

export default Header
