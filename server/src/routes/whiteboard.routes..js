import {
    getWhiteboardState,
    saveWhiteboardState
} from "../controllers/whiteboard.controller.js"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js" // Debug why it displays error

const router = Router()

router.route('/getW/:groupId').get(getWhiteboardState)
router.route('/saveW/:groupId').post(saveWhiteboardState)

export default router