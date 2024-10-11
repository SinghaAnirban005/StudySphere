import {
    createGroup,
    getMembers,
    // addResources,
    removeMemberFromGroup
} from '../controllers/group.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const router = Router()

router.route('/createGroup').post(verifyJWT, createGroup)
router.route('/getMembers').get(verifyJWT, getMembers)
// router.route('/addResource').post(verifyJWT, addResources)
router.route('/remove').delete(verifyJWT, removeMemberFromGroup)

export default router