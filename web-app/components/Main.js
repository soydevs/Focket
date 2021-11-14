import { useState, useEffect, useCallback, useMemo } from "react";
import ArticleList from "../components/ArticleList";
import TagsList from "../components/TagsList";
import SearchBar from "../components/SearchBar";
import { getUniqueTagsFromArticles, handleSort } from "../utils/utils";
import SortMenu from "./SortMenu";
import { CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddArticleUrl from "./AddArticleUrl";
import { toast } from "react-toastify";

const Main = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [addUrlFieldVisible, setAddUrlFieldVisible] = useState(false);

  const setData = () => {
    setIsLoading(true);
    fetch("/api/articles")
      .then((res) => res.json())
      .then((res) => {
        setAllArticles(res.data);
        setArticles(res.data);
      })
      .catch((err) => console.log("Error in fetching articles: " + err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setArticles(allArticles);
      return;
    }

    if (searchQuery[0] === "#") {
      const selectedTag = searchQuery.slice(1).toLowerCase();
      setArticles(
        allArticles.filter((el) =>
          el.tags.join(" ").toLowerCase().includes(selectedTag)
        )
      );
      return;
    }

    setArticles(
      allArticles.filter(
        (el) =>
          el.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.tags.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleTagClick = (tagName) => {
    setSearchQuery(tagName);
  };

  const handleAddNewArticle = async (article) => {
    toast("Parsing data and saving article");
    try {
      const res = await fetch("api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });
      if (res.status === 201) {
        toast("Successfully added article.");
        const savedArticle = (await res.json()).data;
        console.log(savedArticle);
        setAddUrlFieldVisible(false)
        setData();
      } else throw "Server error";
    } catch (err) {
      console.log("Error in adding: " + err);
      toast(
        "There seems to to some error in adding the article. Please vefiy your network connectivity and try again after some time"
      );
    }
  };

  const allTags = useMemo(
    () => getUniqueTagsFromArticles(allArticles),
    [allArticles]
  );

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

      {addUrlFieldVisible ? (
        <AddArticleUrl
          onCancel={() => setAddUrlFieldVisible(false)}
          onAdd={handleAddNewArticle}
          allTags={allTags}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchBar searchValue={searchQuery} handleSearch={setSearchQuery} />
          <SortMenu setSortKey={setSortKey} />
          <IconButton onClick={() => setAddUrlFieldVisible(true)}>
            <AddIcon />
          </IconButton>
        </div>
      )}
      <TagsList tags={allTags} clickHandler={handleTagClick} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <ArticleList articles={handleSort(sortKey, articles)} />
      )}
    </div>
  );
};

export default Main;
