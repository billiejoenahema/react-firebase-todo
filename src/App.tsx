import { FormControl, List, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './App.css'
import { db } from './firebase'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import TaskItem from './TaskItem'

const App: React.VFC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [inputTask, setInputTask] = useState('')
  useEffect(() => {
    const unSubscribe = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      )
    })
    return () => unSubscribe()
  }, [])

  const createTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: inputTask })
    setInputTask('')
  }

  return (
    <div className="App">
      <h1>Todo App by React/Firebase</h1>
      <FormControl>
        <TextField
          label="New task?"
          value={inputTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputTask(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!inputTask} onClick={createTask}>
        <AddToPhotosIcon />
      </button>
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  )
}

export default App
