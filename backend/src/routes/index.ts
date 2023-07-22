import {
    Router
} from "express";
import {
    authRouter
} from './auth'
import {
    aiRouter
} from './ai'

const router = Router()

router.use('/auth', authRouter)
router.use('/ai', aiRouter)

export { router }