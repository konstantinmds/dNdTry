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

export const ColNameWrapper = styled.div`
display: flex;
flex-direction: row;
align-content: space-between;  
justify-content: space-between;
`


export const Backdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 10;
background: rgba(0,0,0, 0.75);
`

export const Modal = styled.div`
position: fixed;
top: 20vh;
left: 15%;
width: 60%;
z-index: 100;
overflow: hidden;
`

export const ModalSeq = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
`

export const ModalSeqHeader = styled.div`
padding: 20px;
font-weight: bold;
`

export const StyledInput = styled.input`
width: 90%;
padding: grey;
border: 0px;
font-size: 12px;
cursor: pointer
`


export const AppBaseContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  font-family: emoji;
  width: 100%;
  background-color: #fffffe;
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

export const Menu = styled.ul`
  background-color: #ccbdbe42;
  border-radius: 2px;
  width: 300px;
  font-size:16px;
  padding-left: 0;
  margin: 0;
  position: absolute;
  list-style: none;
  z-index: 1;
  .li {
  padding: 0.5em 3em;
  color: #000;
  cursor: pointer;
  background-color: #fff;
  border: 4px solid #ccc;
}

 li:hover {
  background-color: #aba6a6;
  cursor:pointer
}

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
background-color: #f3f3f3;
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
export const FormDiv = styled.div`
margin: 20px;
display: flex;
`

export const InputFieldOuter = styled.input`
background: transparent;
border: groove;
outline: none;
width: 100%;
`


export const PrimaryButton1 = styled.button`
  background-color: #0078d4;
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

export const HandlerModal = styled.div`
margin-bottom: 20px;
padding-bottom: 20px;
`

export const PrimaryButton3 = styled.button`
background-color: #0078d4;
border: none;
color: white;
padding: 13px 13px 11px 11px;
text-align: center;
-webkit-text-decoration: none;
text-decoration: none;
display: inline-table;
font-size: 16px;
outline: none;
border: none;
margin-left: 20px;
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
  border: 2px solid  #c0def3;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  background-color: #0078d4;
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