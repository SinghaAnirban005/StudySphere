import {
    getMessages
} from "../controllers/chat.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js"

import { Router } from 'express'

const router = Router()

router.route('/:groupId').get(verifyJWT, getMessages)

export default router