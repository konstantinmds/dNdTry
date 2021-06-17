import React from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { List, Task } from '../../react-app-env'
import {
  Backdrop,
  Modal,
  ModalSeq,
  FormDiv,
  PrimaryButton3,
  HandlerModal,
  ModalSeqHeader,
  StyledInput,
} from '../../styles'

interface ModalOverlayProps {
  listId: string
  tasks: Task[]
}

const BackdropOverlay = () => {
  return (
    <Backdrop />
  )
}

const onSubmit = (data: any) => {
  console.log('data', data)
  
}

const onCancel = (data: any) => {
  console.log('data', data)
}


const ModalOverlay = ({ listId, tasks }: ModalOverlayProps) => {
  const { register, handleSubmit } = useForm<any>()


  return (
    <Modal>
      <ModalSeq>
        <ModalSeqHeader>{listId}</ModalSeqHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {tasks.map((task: Task, i) => (
            <FormDiv key={task.cellName + i.toString()}>
              <ul>
                <li>
                  {task.cellName} - {task.fileName}
                  <StyledInput
                    type="number"
                    defaultValue={`${task.seqNumber.toString()}`}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register(`${task.taskId.toString()}`)}
                  />
                </li>
              </ul>
            </FormDiv>
          ))}
          <HandlerModal>
            <PrimaryButton3 type="submit">Submit</PrimaryButton3>
            <PrimaryButton3 onClick={onCancel}>Cancel</PrimaryButton3>
          </HandlerModal>
        </form>
      </ModalSeq>
    </Modal>
  )
}



const ChangeSeq = (props: List) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        // eslint-disable-next-line react/destructuring-assignment
        <BackdropOverlay />,
        document.getElementById('backdrop-root') as Element
      )}
      {ReactDOM.createPortal(
        // eslint-disable-next-line react/destructuring-assignment
        <ModalOverlay listId={props.listId} tasks={props.tasks} />,
        document.getElementById('overlay-root') as Element
      )}
    </React.Fragment>
  )
}

export default ChangeSeq
