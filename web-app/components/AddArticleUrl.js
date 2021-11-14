import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Chips from "react-chips";

const AddArticleUrl = ({ onAdd, onCancel, allTags }) => {
  const [articleUrl, setArticleUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setArticleUrl("");
    setError(false);
  }, []);

  const handleSubmit = () => {
    const isValid = /^(ftp|http|https):\/\/[^ "]+$/.test(articleUrl);
    if (!isValid) {
      setError(true);
      return;
    }
    onAdd({ url: articleUrl, tags });
    setError(false);
  };

  const handleCancel = () => {
    onCancel(articleUrl);
    setArticleUrl("");
    setError(false);
  };

  return (
    <div>
      <input
        placeholder="Enter or paste an article URL to add it to your knowledge base"
        value={articleUrl}
        type="text"
        style={{ width: 500, marginBottom: 10, marginTop: 5 }}
        onChange={(e) => setArticleUrl(e.target.value)}
      />
      <Chips
        placeholder="Tags"
        value={tags}
        onChange={(val) => setTags(val)}
        suggestions={allTags}
      />
      <div style={{ marginTop: 10, marginBottom: 5, textAlign: "center" }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Add Article
        </Button>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please enter a valid url
        </p>
      )}
    </div>
  );
};

export default AddArticleUrl;
