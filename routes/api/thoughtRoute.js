const router = require('express').Router();
const allThoughts = require('../../controllers/thoughtcon.js');
const idThought = require('../../controllers/thoughtcon.js');
const addThought = require('../../controllers/thoughtcon.js');
const removeThought = require('../../controllers/thoughtcon.js');
const updateThought = require('../../controllers/thoughtcon.js');
const addReact = require('../../controllers/thoughtcon.js');
const removeReact = require('../../controllers/thoughtcon.js');

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
