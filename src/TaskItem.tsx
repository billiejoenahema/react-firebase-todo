import React from 'react'
import firebase from 'firebase/app'
import {ListItem, TextField, Grid} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

interface PROPS {
  id: string
  title: string
}

const TaskItem: React.VFC<PROPS> = (props) => {
  return (
    <div>
      <ListItem>
        　<h2>{props.title}</h2>
      </ListItem>
    </div>
  )
}

export default TaskItem
