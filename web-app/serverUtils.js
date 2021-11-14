const read = require("node-readability");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

export const getDataFromUrl = ({ url = "", tags = [] }) => {
  return new Promise((resolve) => {
    read(url, async (err, article) => {
      try {
      let html = "";
      let content = "";
      let response;
      if (err) {
        try {
          console.log(url)
        response = await fetch(url);
        } catch(e) {
          console.log("eeeehh:"+e);
        }
        html = await response.text();
      } else {
        html = article.html;
        content = article.content;
      }

      const doc = domino.createWindow(html).document;
      const metadata = getMetadata(doc, url);
      const { title, keywords, image, description } = metadata;
      !err && article.close();

      resolve({
        url,
        title,
        notes: [],
        description,
        content,
        tags: tags ? tags : keywords?.length ? keywords : [],
        imgUrl: image,
      });
    } catch(e) {
      console.log("errrrr:"+e)
    }
    });
  });
};
