import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <div id='main-header'>
      <h1>To Do</h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App
