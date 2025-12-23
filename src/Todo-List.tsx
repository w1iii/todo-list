import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './Todo-List.css'
import { useState } from 'react'

interface Todo {
  item: string
  status: 'pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
}

export default function DataTable() {
  const [items, setItems] = useState<Todo[]>([])
  const [addItem, setAddItem] = useState('')

  function handleSubmit() {
    if (!addItem.trim()) return
    setItems(prev => [
      ...prev,
      { item: addItem, status: 'pending', priority: 'low' },
    ])
    setAddItem('')
  }

  function deleteItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function handlePriorityChange(index: number, newPriority: Todo['priority']) {
    setItems(prev =>
      prev.map((todo, i) =>
        i === index ? { ...todo, priority: newPriority } : todo
      )
    )
  }

  function handleComplete(index: number){
    setItems(prev =>
      prev.map((todo, i) =>
        i === index ? {...todo, status: todo.status === "pending" ? "completed" : "pending"} : todo
    ))
  }

  return (
    <div className="table-wrapper">
      <div className="input-section">
        <input
          type="text"
          value={addItem}
          onChange={e => setAddItem(e.target.value)}
        />
        <button onClick={handleSubmit}>add</button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table size="small" className="small-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Todo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <input type="checkbox" onClick={() => handleComplete(index)}/>
                </TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.status}</TableCell>

                {/* Priority dropdown */}
                <TableCell>
                  <select
                    value={row.priority}
                    onChange={e =>
                      handlePriorityChange(index, e.target.value as Todo['priority'])
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </TableCell>

                <TableCell>
                  <button onClick={() => deleteItem(index)}>delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

