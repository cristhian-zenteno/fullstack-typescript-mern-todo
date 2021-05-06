import { Router } from 'express'
import { getTodos, addTodo, updateTodo } from '../controllers/todos'
 
const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', addTodo)

router.put('/edit-todo/:id', updateTodo)

export default router
