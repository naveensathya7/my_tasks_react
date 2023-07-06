import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskName: '',
    tagName: tagsList[0].optionId,
    activeTag: '',
    tasksList: [],
  }

  changeTag = id => {
    const {activeTag} = this.state
    if (activeTag === id) {
      this.setState({activeTag: ''})
    } else {
      this.setState({
        activeTag: tagsList.filter(each => each.optionId === id)[0].optionId,
      })
    }
  }

  onChangeTask = event => {
    this.setState({taskName: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tagName: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {tasksList, tagName, taskName} = this.state

    this.setState(prevState => ({
      tasksList: [
        ...prevState.tasksList,
        {
          id: v4(),
          task: taskName,
          tagId: tagName,
          tagName: tagsList.filter(each => each.optionId === tagName)[0]
            .displayText,
        },
      ],
      taskName: '',
      tagName: tagsList[0].optionId,
    }))
  }

  renderCreateTask = () => {
    const {taskName, tagName} = this.state

    return (
      <div className="task-create-section">
        <h1 className="top-heading">Create a task</h1>
        <form className="input-form" onSubmit={this.addTask}>
          <label htmlFor="taskName">Task</label>
          <br />
          <input
            className="input-block"
            type="text"
            value={taskName}
            placeholder="Enter the task here"
            id="taskName"
            onChange={this.onChangeTask}
          />
          <br />
          <label htmlFor="tagName">Tags</label>
          <br />
          <select
            id="tagName"
            className="input-block"
            onChange={this.onChangeTag}
            value={tagName}
          >
            {tagsList.map(eachTag => (
              <option key={eachTag.optionId} value={eachTag.optionId}>
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button className="add-task-btn">Add Task</button>
        </form>
      </div>
    )
  }

  renderTaskList = () => {
    const {tasksList, activeTag} = this.state
    const FilteredTaskList = tasksList.filter(each =>
      each.tagId.includes(activeTag),
    )
    const noTasksFound = FilteredTaskList.length === 0
    console.log(activeTag)
    return (
      <div className="show-task-section">
        <h1>Tags</h1>
        <ul className="tags-list">
          {tagsList.map(eachTag => (
            <TagItem
              key={eachTag.optionId}
              tagDetails={eachTag}
              changeTag={this.changeTag}
              isActive={activeTag === eachTag.optionId}
            />
          ))}
        </ul>
        <h1>Tasks List</h1>
        {noTasksFound ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <ul className="task-list">
            {FilteredTaskList.map(eachTask => (
              <TaskItem key={eachTask.id} taskDetails={eachTask} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {tagName} = this.state

    return (
      <div className="task-container">
        {this.renderCreateTask()}
        {this.renderTaskList()}
      </div>
    )
  }
}

export default App
