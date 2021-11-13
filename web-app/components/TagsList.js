import React from "react";

const TagsList = ({ tags, clickHandler }) => {
  return (
    <span className='tag-container' style={{ marginTop: 10 }}>
      {tags.map((tag) => (
        <span
          onClick={() => clickHandler && clickHandler(`#${tag}`)}
          style={{
            borderRadius: 25,
            backgroundColor: "grey",
            padding: "5px 10px",
            marginRight: "2px",
            cursor: clickHandler ? "pointer" : "",
          }}
        >
          {tag}
        </span>
      ))}
    </span>
  );
};

export default TagsList;
