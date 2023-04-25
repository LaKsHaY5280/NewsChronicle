import React, { Component } from "react";
import Spinner from "./Spinner";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newsbox extends Component {
  static propTypes = {
    category: PropTypes.string,
  };
  static defaultProps = {
    category: "general",
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
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
    let fetchingurl = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=2df9f61b4103445cb7786b27d42d1265&pageSize=15&page=${
      this.state.page - 1
    }`;
    const response = await fetch(fetchingurl);
    const data = await response.json();

    this.setState({
      articles:
        this.state.page === 1
          ? data.articles
          : [...this.state.articles, ...data.articles],
      totalResults: data.totalResults,
      status: data.status,
      loading: false,
    });
    return data.articles;
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div className="container">
        <h2 className="my-3 ">
          Headlines - {this.capitalizeFirstLetter(this.props.category)}
        </h2>
        <div className="container my-4">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {!this.state.loading &&
                this.state.articles &&
                this.state.articles.map((element, index) => {
                  return (
                    <div className="col-md-4" key={element.url || index}>
                      <Newsitems
                        title={element.title ? element.title.slice(0, 40) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 90)
                            : ""
                        }
                        imgurl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://1.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
          <div className="d-flex justify-content-between"></div>
        </div>
      </div>
    );
  }
}
