import React, { Component } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Newsbosty.css";
import noimg from "./noimg.jpg";
import Newsitems from "./Newsitems.js";

export default class Newsbox extends Component {
  static propTypes = {
    category: PropTypes.string,
  };
  static defaultProps = {
    category: "general",
    defaultkey: "default",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      newArticles: [],
      page: 1,
      totalResults: 0,
      status: "",
      loading: false,
    };
    document.title = `Newschronicle -  ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  updateDocumentTitle = () => {
    document.title = `Newschronicle - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  };

  async componentDidMount() {
    this.fetchNews();
    this.updateDocumentTitle();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.setState(
        {
          articles: [],
          page: 1,
        },
        async () => {
          this.fetchNews();
          this.updateDocumentTitle();
        }
      );
    } else if (prevState.page !== this.state.page) {
      this.fetchNews();
      this.updateDocumentTitle();
    }
  }

  fetchMoreData = async () => {
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
      },
      async () => {
        const newArticles = await this.fetchNews();
        this.setState({
          articles: [...this.state.articles, ...newArticles],
          loading: false,
        });
      }
    );
  };

  fetchNews = async () => {
    this.props.setprog(10);
    this.setState({ loading: true });
    const fetchingurl = `https://newsapi.org/v2/top-headlines?&apiKey=2df9f61b4103445cb7786b27d42d1265&country=in&pageSize=6&page=${this.state.page}&category=${this.props.category}`;

  
    try {
      const response = await fetch(fetchingurl);
      const data = await response.json();
      const articleUrls = new Set(this.state.articles.map((article) => article.url));
      const uniqueArticles = data.articles.filter((article) => !articleUrls.has(article.url));
      this.setState({
        articles: [...this.state.articles, ...uniqueArticles],
        totalResults: data.totalResults,
      });
      this.props.setprog(100);
      return uniqueArticles ;
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, status: "error" });
    }
  };
  

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center my-5">
          Newschronicle - {this.capitalizeFirstLetter(this.props.category)}
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0}
          style={{ overflow: "hidden" }}
          next={this.fetchMoreData}
          hasMore={
            this.state.articles &&
            this.state.articles.length &&
            this.state.articles.length < this.state.totalResults
          }
          loader={<Spinner />}
          endMessage={
            <p className="text-center">
              {this.state.status === "error"
                ? "Oops! Something went wrong."
                : "Yay! You have seen it all."}
            </p>
          }
        >
          <div className="row">
            {!this.state.articles ||
            (this.state.articles.length === 0 && !this.state.loading) ? (
              <div className="alert alert-danger" role="alert">
                No news articles found.
              </div>
            ) : (
              this.state.articles.map((element) => {
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
                } else {
                  return null;
                }
              })
            )}
          </div>
            <div></div>
        </InfiniteScroll>
      </div>
    );
  }
}