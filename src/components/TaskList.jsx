import { useState } from "react";
import { deleteTask, editTask, setSearchFilter, setStatusFilter, toggleComplete } from "../redux/features/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskList = () => {
  const { filter, tasks } = useSelector((state) => state.tasks)

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const dispatch = useDispatch()

  const filteredTask = tasks.filter(task => {
    if (filter.status === 'completed') return task.completed;
    if (filter.status === 'pending') return !task.completed;
    return true;
  }).filter(task => task.text.toLowerCase().includes(filter.search.toLowerCase()))

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  }

  const handleSave = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, newText: editText.trim() }))
      setEditId(null);
      setEditText('');
    }
  }
  return (
    <div>
      <div>
        <input
          id="search-task"
          type="text"
          placeholder="Search to-do"
          value={filter.search}
          onChange={(event) => dispatch(setSearchFilter(event.target.value))}
        />
      </div>




      <ul id="task-list">
        <div id="tabs">
          {
            ['all', 'completed', 'pending'].map(status => (
              <button
                onClick={() => dispatch(setStatusFilter(status))}
                id={(filter.status === status ? "tabs-button" : 'tabs-inactive')}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))
          }
        </div>


        {filteredTask.length === 0 && <p>No to-do's found.</p>}
        {
          filteredTask.map(task => (
            <li key={task.id} id="check-list">
              <div id="check-box">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleComplete(task.id))}
                />
                {
                  editId === task.id ? (
                    <input type="text" value={editText} onChange={(event) => setEditText(event.target.value)} />
                  ) : (
                    <span id={task.completed ? 'task-complete' : ''}>{task.text}</span>
                  )
                }
              </div>

              <div id='task-buttons'>
                {
                  editId === task.id ? (
                    <button
                      id="save-button"
                      onClick={() => handleSave(task.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      id="edit-button"
                      onClick={() => handleEdit(task.id, task.text)}
                    >
                      Edit
                    </button>
                  )
                }
                <button
                  id="delete-button"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default TaskList