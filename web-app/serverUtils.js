const read = require("node-readability");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

export const getDataFromUrl = (url = "") => {
  return new Promise((resolve) => {
    read(
      "http://howtonode.org/really-simple-file-uploads",
      async (err, article) => {
        let html = "";
        let content = "";

        if (err) {
          const response = await fetch(url);
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
          tags: keywords?.length ? keywords : [],
          imgUrl: image,
        });
      }
    );
  });
};
