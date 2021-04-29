import {FormControl, TextField} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import './App.css'
import { db } from './firebase'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'

const App: React.VFC = () => {
  const [tasks, setTasks] = useState([{id: '', title: ''}])
  const [inputTask, setInputTask] = useState('')
  useEffect(() => {
    const unSubscribe = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({id: doc.id, title: doc.data().title}))
      )
    })
    return () => unSubscribe()
  },[])

  const createTask = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    db.collection('tasks').add({title: inputTask})
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
      {tasks.map((task) => <h3 key={task.id}>{task.title}</h3>)}
    </div>
  )
}

export default App
