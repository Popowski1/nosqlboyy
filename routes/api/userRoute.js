const router = require('express').Router();
const { allUsers ,
 UserId ,
 addUser ,
 removeUser ,
 updateUser ,
 addFriend ,
 removeFriend } = require('../../controllers/usercon');

router
.route('/')
.get(allUsers)
.post(addUser);

router
.route('/:Id')
.get(UserId)
.put(updateUser)
.delete(removeUser);

router
.route('/:UserId/friends/:friendId')
.post(addFriend);

router
.route('/:UserId/friends/:friendId')
.delete(removeFriend);
module.exports = router;
