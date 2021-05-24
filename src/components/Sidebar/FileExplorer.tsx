import React, { useState } from 'react'
import styled from 'styled-components'
import { Tree } from './Tree'

const StyledFileExplorer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
`

const TreeWrapper = styled.div`
  width: 250px;
`

interface SelectedElemProps {
  type: string
  content: string
}

interface FileExplorerProps {
  navLists: any
}

export const FileExplorer = (props: { navLists: FileExplorerProps }): any => {
  const { navLists } = props
  const [selectedFile, setSelectedFile] = useState(
    (null as unknown) as SelectedElemProps
  )

  const onSelect = (file) => setSelectedFile(file)

  return (
    <StyledFileExplorer>
      <TreeWrapper>
        <Tree state={navLists} onSelect={onSelect} />
      </TreeWrapper>
      <div>
        {selectedFile && selectedFile.type === 'file' && selectedFile.content}
      </div>
    </StyledFileExplorer>
  )
}