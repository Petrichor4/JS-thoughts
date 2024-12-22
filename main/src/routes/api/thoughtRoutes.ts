import { Router } from 'express'
const router = Router();
import 
{ 
    getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought,
    postReaction,
    deleteReaction 
} 
from '../../controllers/thoughtController.js';

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router