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
    let klet
    if (nodes.nodes) {
      klet = values(nodes.nodes)
    } else {
      klet = values(nodes)
    }

    const milyang = klet.flat().filter((node) => node.fileName !== undefined)
    return milyang
  }

  const onToggle = (node) => {
    // const { nodes } = state;
    let kli
    if (nodes.nodes) {
      kli = nodes.nodes
    } else {
      kli = nodes
    }
    const fili = kli.navLists.filter((r) => node.fileName === r.fileName)[0]
    fili.isOpen = !node.isOpen
    if (fili.isOpen) {
      fili.type = 'cell'
    } else {
      fili.type = 'file'
    }

    setNodes({ nodes: kli })
  }

  const onNodeSelect = () => {
    onSelect(nodes)
  }

  const getChildNodes = (node) => {
    // eslint-disable-next-line react/prop-types
    if (!node.tasks) return []
    return node.tasks.map((path) => path.cellName)
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
