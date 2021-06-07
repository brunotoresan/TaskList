import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function createNewTask(taskTitle: string) {
    let newTask: Task = {
      id: randomIntegerBetween(1, 100), 
      title: taskTitle, 
      isComplete: false
    }
    return newTask
}

function randomIntegerBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function invertIsCompletOfTaskWithId(task: Task, id: number) {
    if (task.id === id) {
        task.isComplete = !(task.isComplete)
    }
    return task
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle != "") {
      setTasks(tasks => [...tasks, createNewTask(newTaskTitle)])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks => {
      return tasks.map(task => invertIsCompletOfTaskWithId(task, id))
    })
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button 
            type="submit" 
            data-testid="add-task-button" 
            onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button 
                type="button" 
                data-testid="remove-task-button" 
                onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}