import { FormControl, List, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import { db } from './firebase'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import TaskItem from './TaskItem'
import { makeStyles } from '@material-ui/styles'
import { auth } from './firebase'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '80%',
  },
})

const App: React.VFC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [inputTask, setInputTask] = useState('')
  const classes = useStyles()

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login')
    })
    return () => unSubscribe()
  })

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
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <button className={styles.app__logout}
        onClick={
          async () => {
            try {
              await auth.signOut()
              props.history.push('login')
            } catch (error) {
              alert(error.message)
            }
          }
        }>
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          label="New task?"
          value={inputTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputTask(e.target.value)
          }
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!inputTask} onClick={createTask}>
        <AddToPhotosIcon />
      </button>
      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  )
}

export default App
