import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from '../redux/features/tasks/taskSlice'
import { nanoid } from "nanoid";

const TaskForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.trim() === '') return;

    dispatch(addTask({
      id: nanoid(),
      text: text.trim(),
      completed: false,
    }))

    setText('')
  }

  return (
    <form id="new-task" onSubmit={handleSubmit}>
      <input
        id="task-title"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add new to-do"
      />
      <button id="addtask-button" type="submit">+</button>
    </form>
  );
}

export default TaskForm