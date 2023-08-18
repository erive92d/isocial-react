const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    postText: {
        type: String,
        required: 'You need to leave a Post!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    postAuthor: {
        type: Object,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            commentAuthor: {
                type: Object,
                required: true,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
    });

postSchema.virtual('authorName').get(function () {
    return this.postAuthor[0].name
});
postSchema.virtual('commentCount').get(function () {
    return this.comments.length
});



const Post = model('Post', postSchema);

module.exports = Post;






