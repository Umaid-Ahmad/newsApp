import { useEffect, useState } from "react";
import NewsArticle from "./components/news-article/NewsArticle";
import Header from "./components/header/Header";
import "./index.css";

const PER_PAGE = 10;
const DEFAULT_VALUE = "usa";
const API_KEY = "03ecb9181c914225b73322810211898b";
// const API_KEY = "03ecb9181c914225b73322810211898";

function App() {
  const [articles, setArticles] = useState({ totalResults: 0, items: [] });
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState(DEFAULT_VALUE);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(2);
  const [error, setError] = useState("");
  console.log("##", { error });

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${API_KEY}&page=1&pageSize=${PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setPage(2);
          console.log({ data });
          setArticles({
            totalResults: data.totalResults,
            items: data.articles,
          });
          setError("");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.log({ error });
        setError(`☠️ ${error.message}! 🚬🗿`);
      });
  }, [searchValue]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const sumScroll = scrollTop + clientHeight;
    console.log({
      scrollEvent: e,
      scrollHeight,
      scrollTop,
      clientHeight,
      sumScroll,
    });
    if (
      sumScroll === scrollHeight ||
      Math.ceil(sumScroll) === scrollHeight ||
      Math.floor(sumScroll) === scrollHeight
    ) {
      if (articles.totalResults !== articles.items.length && !isFetching) {
        setIsFetching(true);
        fetch(
          `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${API_KEY}&page=${page}&pageSize=${PER_PAGE}`
        )
          .then((res) => res.json())
          .then((data) => {
            setIsFetching(false);
            if (data.status === "ok") {
              console.log({ data });
              if (
                [...articles.items, ...data.articles].length !==
                data.totalResults
              ) {
                setPage((prevPage) => prevPage + 1);
              }

              setArticles((prevState) => {
                return {
                  ...prevState,
                  items: [...prevState.items, ...data.articles],
                };
              });
            } else {
              setError(data.message);
            }
          })
          .catch((error) => {
            console.log({ error });
            setError(error.message);
          });
      }
    }
  };
  console.log({ error });
  return (
    <div className="appContainer" onScroll={handleScroll}>
      <Header
        value={inputValue}
        onChange={setInputValue}
        onSubmit={() => setSearchValue(inputValue || DEFAULT_VALUE)}
      />
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {articles.items.map((article) => {
            if (article.author) {
              return (
                <NewsArticle articleObj={article} key={article.publishedAt} />
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
