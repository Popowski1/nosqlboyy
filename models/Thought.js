const {
    Schema,
    model,
Types } = require('mongoose');
const reactionSchema = require('./reacts');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        Minlength: 1,
        maxlength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: Date.now
    },
    username: {
        type: String,
        required: true
    },
   reactions: [reactionSchema]
}, {
toJSON: {
    virtuals: true,
    getters:true
},
id:false
});
thoughtSchema.virtual('reactionLength').get(function () {
    return this.reactions.length;
})
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
