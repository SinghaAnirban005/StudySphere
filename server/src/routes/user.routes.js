import {
    registerUser,
    logoutUser,
    refreshAccessToken,
    loginUser,
    getCurrentUser
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

import { Router } from "express"

const router = Router()

router.route('/register').post(upload.single('profilePic'), registerUser)
router.route('/signIn').post(loginUser)
router.route('/signOut').post(verifyJWT, logoutUser)
router.route('/getUser').get(verifyJWT, getCurrentUser)
router.route('/refreshToken').post(verifyJWT, refreshAccessToken)


export default router