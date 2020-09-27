module.exports = {
  createTagsVector: (posts) => {
    const tagUserVector = {};
    let postTags;

    posts.forEach((post) => {
      postTags = post.tags;

      postTags.forEach(
        (tag) =>
          (tagUserVector[tag] = tagUserVector[tag] ? tagUserVector[tag] + 1 : 1)
      );
    });

    return tagUserVector;
  },
  contentBasedFilteringScore: (tagVector, post) => {
    const postTags = post.tags;
    let postScore = 0;

    postTags.forEach((tag) => {
      postScore += tagVector[tag] ? Math.pow(tagVector[tag], 2) : 0;
    });

    return postScore;
  },
};