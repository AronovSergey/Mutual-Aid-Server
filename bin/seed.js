const Post = require('../mongoose/models/post');
const DB_NAME = 'mymessages'
const MONGODB_URL = `mongodb+srv://sergey:1234@mutual-aid.n2n9z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

async function main() {
    const mongoose = require('mongoose');
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

    await Post.create({ author: 'ynon', text: 'Hello World'})
    await Post.create({ author: 'ynon', text: 'Nice to meet you', color: 'red'})

    mongoose.disconnect();
}

main();