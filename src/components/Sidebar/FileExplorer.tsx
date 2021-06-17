import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppState } from '../../AppStateContext'
import { List, Task } from '../../react-app-env'
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
  const { dispatch } = useAppState()
  const { navLists } = props
  const [selectedFile, setSelectedFile] = useState(
    (null as unknown) as SelectedElemProps
  )

  const onSelect = (file, father) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const g = father ? father.fileName : file.fileName
    setSelectedFile(g)

    if (g) {
      const tasksMutat: Task[] = file.tasks.map((task) => {
        return { cellName: task.cellName, fileName: file.fileName } as Task
      })
      const fileClean: List = { listId: file.fileName, tasks: tasksMutat }
      dispatch({
        type: 'ADD_FILE_FROM_SIDEBAR',
        payload: { file: fileClean },
      })
    }

    /*     if (father) {
      dispatch({
        type: 'ADD_CELL_FROM_SIDEBAR',
        payload: { file_name: g, cell_name: file },
      })
    } else { */
  }

  return (
    <StyledFileExplorer>
      <TreeWrapper>
        <Tree state={navLists} onSelect={onSelect} />
      </TreeWrapper>
      <div>{selectedFile && selectedFile.type === 'file'}</div>
    </StyledFileExplorer>
  )
}
