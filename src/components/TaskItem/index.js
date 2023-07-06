import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {tagName, task} = taskDetails

  return (
    <li className="task-item">
      <p>{task}</p>
      <p className="task-tag">{tagName}</p>
    </li>
  )
}
export default TaskItem
