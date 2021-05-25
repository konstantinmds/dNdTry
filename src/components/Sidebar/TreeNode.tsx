/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { last } from 'lodash'
import React from 'react'
import {
  FaFile,
  FaFolder,
  FaChevronRight,
  FaChevronDown,
  FaFolderOpen,
} from 'react-icons/fa'
import styled from 'styled-components'

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20
  if (type === 'cell') paddingLeft += 20
  return paddingLeft
}

interface StyledTreeNodeProps {
  level: string
  type: string
}

interface NodeIconProps {
  marginRight: number
}

const StyledTreeNode = styled.div<StyledTreeNodeProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${(props) => getPaddingLeft(props.level, props.type)}px;
`

const NodeIcon = styled.div<NodeIconProps>`
  font-size: 12px;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 5)}px;
`

const getNodeLabel = (node): any => {
  if (typeof node === 'string') {
    return node
  }

  const fit = node.fileName.split('\\')
  return last(fit)
}

const TreeNode = (props) => {
  const { node, getChildNodes, level, onToggle, onNodeSelect } = props

  const getType = () => {
    if (typeof node === 'string') {
      return 'cell'
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    node.fileName !== undefined ? (node.type = 'file') : (node.type = 'cell')
    return node.type
  }

  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={getType()}>
        <NodeIcon marginRight={10} onClick={() => onToggle(node)}>
          {node.type === 'file' &&
            (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === 'cell' && <FaFile />}
          {node.type === 'file' && node.isOpen === true && <FaFolderOpen />}
          {node.type === 'file' && !node.isOpen && <FaFolder />}
        </NodeIcon>

        <span role="button" onClick={() => onNodeSelect(node)}>
          {getNodeLabel(node)}
        </span>
      </StyledTreeNode>

      {node.isOpen &&
        getChildNodes(node).map((childNode) => (
          <TreeNode {...props} node={childNode} level={level + 1} />
        ))}
    </React.Fragment>
  )
}

TreeNode.defaultProps = {
  level: 0,
}

export default TreeNode