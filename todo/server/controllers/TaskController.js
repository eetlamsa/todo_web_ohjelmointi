import { deleteTask, insertTask, selectAllTasks } from '../models/Task.js'
import { ApiError } from '../helper/ApiError.js'

const getTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error)
    }
}

const createTask = async (req, res, next) => {
    try {
        const description = req.body?.task?.description?.trim()

        if (!description) {
            return next(new ApiError('Task description is required', 400))
        }

        const result = await insertTask(description)
        return res.status(201).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}

const removeTask = async (req, res, next) => {
    try {
        const result = await deleteTask(req.params.id)

        if (result.rowCount === 0) {
            return next(new ApiError('Task not found', 404))
        }

        return res.status(200).json({ id: req.params.id })
    } catch (error) {
        return next(error)
    }
}

export { getTasks, createTask, removeTask }
