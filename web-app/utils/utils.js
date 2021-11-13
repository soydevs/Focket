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

export const handleSort = (key = "", articles = []) => {
  let params;
  let asc = true;
  switch (key) {
    case "alph":
      params = "title";
      break;
    case "new":
      params = "addedTime";
      break;
    case "old":
      params = "addedTime";
      asc = false;
      break;
  }
  articles.sort((a, b) => {
    return asc ? a[params] < b[params] : a[params] > b[params];
  });
  return articles;
};
