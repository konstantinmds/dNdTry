/* eslint-disable prettier/prettier */
import styled from 'styled-components'


interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`

transform: ${props => (props.isPreview ? "rotate(5deg)" : undefined )};
opacity: ${props => (props.isHidden ? 0 :1 )};
`

export const AppBaseContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
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
max-width: 300px;
border-radius: 3px;
box-shadow: #091e4240 0px 1px 0px 0px;
text-align: justify;
`

export const SidebarContainer = styled.div`
height: 100%;
width: 150px;
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

export type OptionsType = {
  value: string
  label: string
}
