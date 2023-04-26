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
    if (
      prevProps.category !== this.props.category ||
      prevState.page !== this.state.page
    ) {
      this.fetchNews();
      this.updateDocumentTitle();
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      const newArticles = await this.fetchNews();
      this.setState({
        articles: [...this.state.articles, ...newArticles],
      });
    });
  };

  fetchNews = async () => {
    this.setState({ loading: true });
    let fetchingurl = `https://newsapi.org/v2/top-headlines?&apiKey=2df9f61b4103445cb7786b27d42d1265&country=in&pageSize=15&page=${this.state.page}&category=${this.props.category}`;

    try {
      const response = await fetch(fetchingurl);
      const jsonData = await response.json();
      this.setState({
        articles:
          this.state.page === 1
            ? jsonData.articles
            : [...this.state.articles, ...jsonData.articles],
        totalResults: jsonData.totalResults,
        loading: false,
      });
      return jsonData.articles;
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
                return (
                  <div key={element.url} className="col-md-4">
                    <Newsitems
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage ? element.urlToImage : noimg}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt ? element.publishedAt : ""}
                      source={element.source.name}
                    />
                  </div>
                );
              })
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}