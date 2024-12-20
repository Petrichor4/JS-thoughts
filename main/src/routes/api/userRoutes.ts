import { Router } from 'express'
const router = Router();
import { getSingleUser, getUsers, createUser, addFriend, removeFriend, updateUser, deleteUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:id/friends/:frindId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

export default router