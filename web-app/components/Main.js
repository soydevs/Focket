import React, { useEffect } from "react";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import TagsList from "../components/TagsList";
import SearchBar from "../components/SearchBar";
import { tempArticles } from "../tempData";
import { getUniqueTagsFromArticles, handleSort } from "../utils/utils";
import SortMenu from "./SortMenu";

const Main = () => {
  const [articles, setArticles] = useState(tempArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      setArticles(tempArticles);
      return;
    }
    if (searchQuery[0] === "#") {
      const selectedTag = searchQuery.slice(1).toLowerCase();
      setArticles(
        tempArticles.filter((el) =>
          el.tags.toString().toLowerCase().includes(selectedTag)
        )
      );
      return;
    }
    const filteredArticles = tempArticles.filter(
      (el) =>
        el.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.tags.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    setArticles(filteredArticles);
  }, [searchQuery]);

  const handleTagClick = (tagName) => {
    setSearchQuery(tagName);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Focket</h1>
      <p>Your Personal and Private Knowledge Management Library</p>
      <div style={{ display: "flex" }}>
        <SearchBar searchValue={searchQuery} handleSearch={setSearchQuery} />
        <SortMenu setSortKey={setSortKey} />
      </div>
      <TagsList
        tags={getUniqueTagsFromArticles(tempArticles)}
        clickHandler={handleTagClick}
      />
      <ArticleList articles={handleSort(sortKey, articles)} />
    </div>
  );
};

export default Main;
