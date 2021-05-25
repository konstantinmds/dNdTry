/* eslint-disable prettier/prettier */
import { GroupTypeBase, OptionTypeBase, ValueType } from 'react-select'
import styled from 'styled-components'


interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

interface HeButt {
  shouldHover?: boolean
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`

transform: ${props => (props.isPreview ? "rotate(5deg)" : undefined )};
opacity: ${props => (props.isHidden ? 0 :1 )};
`

export const TheButt = styled.div<HeButt>`
color: ${props => (props.shouldHover ? 'red' : 'grey')}

`

export const Bit = styled(TheButt)`
height: 17px;
width: 20px;
border-radius: 20px 20px 20px 20px;
margin-left: auto;
`



export const AppBaseContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  font-family: emoji;
  width: 100%;
  background-color: #3179ba;


`

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 330px;
  min-height: 40px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0; 
  margin-right: auto;
  margin-left: auto;

`

export const ColumnTitle = styled.div`
padding: 6px 16px 12px;
font-weight:bold;
`

export const CardContainer = styled(DragPreviewContainer)`
background-color: #fff;
cursor: pointer;
margin-bottom: 1.8rem;
padding: 0.5rem 2rem;
max-width: 400px;
border-radius: 3px;
box-shadow: #091e4240 0px 1px 0px 0px;
text-align: justify;
`

export const SidebarContainer = styled.div`
height: 100vh;
width: 450px;
margin-right: 20px;
position: relative;
z-index: 1;
top:0;
left:0;
overflow-x: hidden;
padding-top:20px;
border-style: solid;
`

export const CustomDragLayerContainer = styled.div`
height: 100%;
left: 0;
pointer-events: none;
position: fixed;
top: 0;
width: 100%;
z-index: 100;
`

export const PrimaryButton1 = styled.button`
  background-color: #3f6fbc;
  border: none;
  color: white;
  padding: 7px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 11px;
  border-radius: 12px 11px;
  outline: none;
  border:none
`

export const Button2 = styled.button`
  padding: 5px 12px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.color1};
  border: 0px;
  border-radius: 3px;
  appearance: none;
  cursor: pointer;
`;

export const ButtonRed = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  background: palevioletred;
  color: white;
  
`;


export type OptionsType = {
  value: string
  label: string
}


export type SelectProps = ReadonlyArray<OptionTypeBase | GroupTypeBase<any>> & {
  options: OptionsType,
  value: ValueType<OptionsType,any>,
  onChange: any
}