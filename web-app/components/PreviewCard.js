import React from "react";
import Image from "next/image";

const PreviewCard = ({ article }) => {
  const { url, title, description, imgUrl, addedTime } = article;
  console.log(imgUrl);
  return (
    <div
      style={{ padding: 10, marginLeft: 30, marginRight: 30, display: "flex" }}
    >
      <Image width='170' height='170' src={imgUrl} style={{ flex: 1 }} />
      <div style={{ flex: 3, marginLeft: 20 }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <hr />
        <span>
          <b>Added on: </b>
          {new Date(addedTime).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PreviewCard;
