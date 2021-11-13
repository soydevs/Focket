export const getUniqueTagsFromArticles = (articles) => {
  let tags = [];
  for (let i = 0; i < articles.length; i++) {
    let currArtTags = articles[i].tags;
    for (let j = 0; j < currArtTags.length; j++) {
      if (!tags.includes(currArtTags[j])) {
        tags.push(currArtTags[j]);
      }
    }
  }
  return tags;
};
