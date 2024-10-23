import {
    createGroup,
    getMembers,
    // addResources,\
    removeMemberFromGroup,
    getGroups,
    getGroupInfo,
    addMember,
    deleteGroup,
    filterGroups,
    leaveGroup
} from '../controllers/group.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { Router } from 'express'


const router = Router()

router.route('/createGroup').post(verifyJWT, createGroup)
router.route('/getMembers').get(verifyJWT, getMembers)
router.route('/getG').get(getGroups)
router.route('/c/:groupId').get(verifyJWT, getGroupInfo)
router.route('/remove').delete(verifyJWT, removeMemberFromGroup)
router.route('/add/:groupId').post(verifyJWT, addMember)
router.route('/delete/:groupId').delete(verifyJWT, deleteGroup)
router.route('/filterGroups').get(verifyJWT, filterGroups)
router.route('/leave/:groupId').put(verifyJWT, leaveGroup)

export default router