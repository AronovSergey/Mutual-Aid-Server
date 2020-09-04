const Post = require('../mongoose/models/Post');


class Posts {
    async index(search_expression="") {
        try {
            const posts = await Post.find();
            return ({"error" : false, "posts" : posts})
        } catch(err) {
            return ({"error" : true, "message" : `DB Fetching Error: ${err.message}`})
        }
    }

    async find(id) {
        try {
            const post = await Post.findById(id);
            return ({"error" : false, "post" : post})
        } catch(err) {
            return ({"error" : true, "message" : `DB Fetching Error: ${err.message}`})
        }     
    }
 
    async delete(id) {
        try{
            await Post.remove({ _id: id })
            return ({"error" :  false})
        } catch {
            return ({"error" : true, "message" : `DB Deleting Error: ${err.message}`})
        }
    }
 
    async update(id, payload) {
        const post = await Post.findById(id);
        const { author = post.author, title = post.title, content = post.content } = payload;

        try {
            await Post.updateOne(
                {_id: id},
                { $set: { author, title, content } }
            );
            return ({"error" :  false})
        } catch {
            return ({"error" : true, "message" : `DB Updating Error: ${err.message}`})
        }


    }

    async create(payload) {
        const post = new Post(payload);
        try {
            await post.save();
            return ({"error" : false, "message" : `Post submission has succeeded!`, "post": post})
        } catch(err) {
            return ({"error" : true, "message" : `DB Posting Error: ${err.message}`});
        }
    }
}

module.exports = new Posts();
