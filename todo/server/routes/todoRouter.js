import { Router } from 'express'
import {
    createTask,
    getTasks,
    removeTask
} from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.delete('/:id', removeTask)

export default router
