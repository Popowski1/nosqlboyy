const {User} = require ('../models');
const userCon = {

    allUsers(req, res) {
        User.find({})
        .populate({
            path:'thoughts'
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
    } ,   


UserId({
    params }, res) {
        user.findOne({
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
updateUser({ params, body}, res) {
    User.findOneAndUpdate({
        _id: params._id}, body, {
            new:true
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({
                    message: 'wrong user id.'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    
},

}