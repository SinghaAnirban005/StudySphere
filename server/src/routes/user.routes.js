import {
    registerUser,
    logoutUser,
    refreshAccessToken,
    loginUser,
    getCurrentUser,
    getGroups,
    getLeaderInfo,
    updateProfile
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
router.route('/getGroups').get(verifyJWT, getGroups)
// router.route('/getLeader').get(verifyJWT, getLeader)
router.route('/getLeader').post(verifyJWT, getLeaderInfo)
router.route('/update-profile').put(verifyJWT, updateProfile)

export default router