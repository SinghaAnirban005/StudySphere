import {
    createGroup,
    getMembers,
    // addResources,
    removeMemberFromGroup,
    getGroups,
    getGroupInfo

} from '../controllers/group.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { Router } from 'express'

const router = Router()

router.route('/createGroup').post(verifyJWT, createGroup)
router.route('/getMembers').get(verifyJWT, getMembers)
// router.route('/addResource').post(verifyJWT, addResources)
router.route('/getG').get(getGroups)
router.route('/c/:groupId').get(verifyJWT, getGroupInfo)
router.route('/remove').delete(verifyJWT, removeMemberFromGroup)

export default router