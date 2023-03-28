const { User, Thought } = require('../models');
const userCon = {

    allUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts'
            })
            .populate({
                path: 'friends'
            })
            .sort({
                _id: -1
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    UserId({
        params }, res) {
        User.findOne({
            _id: params._id
        })
            .populate({
                path: 'thoughts'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addUser({
        body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params._id
        }, body, {
            new: true
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'wrong user id.'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));

    },

    removeUser({ params }, res) {
        User.findOneAndDelete({
            _id: params.id
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'wrong user id.'
                    });
                    return;
                }
                return dbUserData;
            })
            .then(dbUserData => {
                User.updateMany({
                    _id: {
                        $in: dbUserData.friends
                    }
                }, {
                    $pull: {
                        friends: params.userId
                    }
                })
                    .then(() => {
                        Thought.deleteMany({
                            username: dbUserData.username
                        })
                            .then(() => {
                                res.json({
                                    message: 'User deleted successfully'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate({
            _id: params.userId
        }, {
            $push: {
                friends: params.friendId
            }
        }, {
            new: true
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'wrong user id.'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)

            });


    },
    removeFriend({ params }, res) {
        User.findOneAndDelete({
            _id: params.thoughtId
        })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(404).json({
                        message: 'wrong friend id.'
                    })
                }
                return User.findOneAndUpdate({
                    friends: params.friendIs
                }, {
                    $pull: {
                        friends: params.friendId
                    }
                }, {
                    new: true
                });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'wrong user id.'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)

            });


    },

}

module.exports = userCon;