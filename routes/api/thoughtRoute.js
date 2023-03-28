const router = require('express').Router();
const {
    allThoughts ,
 idThought ,
 addThought ,
 removeThought ,
 updateThought ,
 addReact ,
 removeReact } = require('../../controllers/thoughtcon');

router
.route('/')
.get(allThoughts)
.post(addThought);

router
.route('/:thoughtId')
.get(idThought)
.put(updateThought)
.delete(removeThought);

router
.route('/:thoughtId/reactions')
.post(addReact);

router
.route('/:thoughtId/reactions/:reactionid')
.delete(removeReact);
module.exports = router;
