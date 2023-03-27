const {
    Schema,
    Types } = require('mongoose');

const reactSchema = new Schema ({
    reactId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        
    },
    reactThis: {
        type: String,
        Maxlength: 200,
        required:true,
    },
    username: [{
        type: String,
        required: true
    }],
    createdAt: [{
        type: Date,
        default: Date.now,
        get: Date.now
    }]
}, {

toJSON: {
    virtuals: true,
    getters:true
},
id:false
});


module.exports = reactSchema;
