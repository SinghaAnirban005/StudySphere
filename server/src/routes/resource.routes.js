import {
    addResource,
    getResources,
    deleteResources
} from "../controllers/resource.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyUser } from "../middlewares/room.middleware.js"

import { Router } from "express"

const router = Router()

router.route('/addResource/:groupId').post(verifyJWT,verifyUser, upload.single('url'), addResource)
router.route('/getResource/:groupId').get(verifyJWT,verifyUser, getResources)
router.route('/deleteResource/:groupId').delete(verifyJWT, verifyUser, deleteResources)

export default router