import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TagsList from "./TagsList";

const fallBackImgUrl = "https://picsum.photos/200";

const PreviewCard = ({ article }) => {
  const { title, description, imgUrl, createdAt, tags } = article;
  return (
    <div
      style={{
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        display: "flex",
        cursor: "pointer",
      }}
    >
      <Image
        width="170"
        height="170"
        src={imgUrl || fallBackImgUrl}
        className={styles.image}
      />
      <div style={{ flex: 3, marginLeft: 20 }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            <b>Added on: </b>
            {new Date(createdAt).toLocaleString()}
          </span>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
