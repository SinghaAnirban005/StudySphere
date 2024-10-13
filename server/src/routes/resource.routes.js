import {
    addResource,
    getResources
} from "../controllers/resource.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

import { Router } from "express"

const router = Router()

router.route('/addResource/:groupId').post(verifyJWT, upload.single('url'), addResource)
router.route('/getResource/:groupId').get(verifyJWT, getResources)

export default router