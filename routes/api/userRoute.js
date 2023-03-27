const router = require('express').Router();
const allUsers = require('../../controllers/usercon.js');
const idUser = require('../../controllers/usercon.js');
const addUser = require('../../controllers/usercon.js');
const removeUser = require('../../controllers/usercon.js');
const updateUser = require('../../controllers/usercon.js');
const addFriend = require('../../controllers/usercon.js');
const removeFriend = require('../../controllers/usercon.js');

router
.route('/')
.get(allUsers)
.post(addUser);

router
.route('/:Id')
.get(idUser)
.put(updateUser)
.delete(removeUser);

router
.route('/:UserId/friends/:friendId')
.post(addFriend);

router
.route('/:UserId/friends/:friendID')
.delete(removeFriend);
module.exports = router;
