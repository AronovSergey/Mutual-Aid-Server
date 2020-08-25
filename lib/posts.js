class posts {
    constructor() {
        this.posts = [
            {id: 1, postTitle: 'paper towel', postContent: 'you clean things with it'},
        ];
        this.nextId = 2;
    }

    index(search_expression="") {
        return this.posts.filter(post => (
            post.postTitle.indexOf(search_expression) >= 0 || post.postContent.indexOf(search_expression) >= 0
        ))
    }

    find(id) {
        return this.posts.find(post => post.id === Number(id));        
    }

    delete(id) {
        const idx = this.posts.findIndex(post => post.id === Number(id));
        if (idx >= 0) {
            this.posts.splice(idx, 1);
        }
    }

    update(id, postTitle, postContent) {
        const post = this.find(id);
        post.postTitle = postTitle;
        post.postContent = postContent;
    }

    create(postTitle, postContent) {
        this.posts.push({ id: this.nextId++, postTitle, postContent });
        return this.nextId - 1;
    }
}

module.exports = new posts();
