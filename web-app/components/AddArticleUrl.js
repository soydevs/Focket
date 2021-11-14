import { useState, useEffect } from "react";

const AddArticleUrl = ({ onAdd, onCancel }) => {
  const [articleUrl, setArticleUrl] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setArticleUrl("");
  }, []);

  const handleSubmit = () => {
    const isValid = /^(ftp|http|https):\/\/[^ "]+$/.test(articleUrl);
    if (!isValid) {
      setError(true);
      return;
    }
    onAdd(articleUrl);
  };

  const handleCancel = () => {
    onCancel(articleUrl);
    setArticleUrl("");
  };

  return (
    <div>
      <input
        placeholder='Enter or paste an article URL to add it to your knowledge base'
        value={articleUrl}
        type='text'
        style={{ width: 500, marginBottom: 10, marginTop: 5 }}
        onChange={(e) => setArticleUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
      <button onClick={handleCancel}>Cancel</button>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Please enter a valid url
        </p>
      )}
    </div>
  );
};

export default AddArticleUrl;
