import React, { useState } from 'react'

// values object u array pomoc
import values from 'lodash/values'
import TreeNode from './TreeNode'

interface TreeProps {
  state: any
  onSelect: (file: any) => void
}

// eslint-disable-next-line react/prop-types
export const Tree = (props: TreeProps) => {
  const { onSelect } = props
  // eslint-disable-next-line react/destructuring-assignment
  const [nodes, setNodes] = useState(props.state)
  const getRootNodes = () => {
    // eslint-disable-next-line react/prop-types

    const klet = values(nodes)
    const milyang = klet.flat().filter((node) => node.fileName !== undefined)
    return milyang
  }

  const onToggle = (node) => {
    // const { nodes } = state;
    const fili = nodes.navLists.filter((r) => node.fileName === r.fileName)[0]
    fili.isOpen = !node.isOpen
    setNodes({ nodes })
  }

  const onNodeSelect = () => {
    onSelect(nodes)
  }

  const getChildNodes = (node) => {
    // eslint-disable-next-line react/prop-types
    if (!node.children) return []
    return node.children.map((path) => nodes[path])
  }

  const rootNodes = getRootNodes()

  return (
    <div>
      {rootNodes.map((node) => (
        <TreeNode
          node={node}
          getChildNodes={getChildNodes}
          onToggle={onToggle}
          onNodeSelect={onNodeSelect}
        />
      ))}
    </div>
  )
}
