import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Newsbosty.css";
import noimg from "./noimg.jpg";
import Newsitems from "./Newsitems.js";

const Newsbox = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setprog(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.newskey}&page=${page}&pageSize=6`;
    setLoading(true);
    let data = await fetch(url);
    props.setprog(30);
    let parsedData = await data.json();
    props.setprog(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setprog(100);
  };

  useEffect(() => {
    updateNews();
  }, [props.category]);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.newskey}&page=${page}&pageSize=6`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center my-5">
        Newschronicle - {capitalizeFirstLetter(props.category)}
      </h1>

      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        style={{ overflow: "hidden" }}
        next={fetchMoreData}
        hasMore={articles && articles.length && articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p className="text-center">
            {status === "error"
              ? "Oops! Something went wrong."
              : "Yay! You have seen it all."}
          </p>
        }
      >
        <div className="row">
          {!articles || (articles.length === 0 && !loading) ? (
            <div className="alert alert-danger" role="alert">
              No news articles found.
            </div>
          ) : (
            articles.map((element) => {
              if (element) {
                return (
                  <div key={element.url} className="col-md-4">
                    <Newsitems
                      title={element.title ? element.title : "No title"}
                      description={
                        element.description
                          ? element.description
                          : "No description"
                      }
                      imgurl={element.urlToImage ? element.urlToImage : noimg}
                      newsurl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={
                        element.publishedAt ? element.publishedAt : "unknown"
                      }
                    />
                  </div>
                );
              }
            })
          )}
        </div>
        <div></div>
      </InfiniteScroll>
    </div>
  );
};
Newsbox.propTypes = {
  category: PropTypes.string,
};
Newsbox.defaultProps = {
  category: "general",
  defaultkey: "default",
};

export default Newsbox;
