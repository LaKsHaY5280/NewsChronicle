import React, { Component } from "react";
import Spinner from "./Spinner";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";

export default class Newsbox extends Component {
  static propTypes = {
    category: PropTypes.string,
  };
  static defaultProps = {
    category: "general",
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      status: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.category !== this.props.category ||
      prevState.page !== this.state.page
    ) {
      this.fetchNews();
    }
  }

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
      articles: data.articles,
      totalResults: data.totalResults,
      status: data.status,
      loading: false,
    });
  };

  prevpage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  nextpage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div className="container">
        <h2 className="my-3 ">Highlights</h2>
        <div className="container my-4">
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
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
          <div className="d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.prevpage}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.status === "error" ||
                this.state.page >= Math.ceil(this.state.totalResults / 30)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.nextpage}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
