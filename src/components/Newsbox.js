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
    };
  }

  async componentDidMount() {
    let fetchingurl =
      "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=2df9f61b4103445cb7786b27d42d1265&pageSize=30&page=1";
    const response = await fetch(fetchingurl);
    const data = await response.json();

    this.setState({
      articles: data.articles,
      page: 1,
      totalResults: data.totalResults,
      status: data.status,
      loading: false,
    });
  }

  prevpage = async () => {
    let fetchingurl = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=2df9f61b4103445cb7786b27d42d1265&pageSize=30&page=${
      this.state.page - 1
    }`;
    this.setState({ loading: true });
    let response = await fetch(fetchingurl);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  nextpage = async () => {
    let fetchingurl = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=2df9f61b4103445cb7786b27d42d1265&pageSize=30&page=${
      this.state.page + 1
    }`;
    this.setState({ loading: true });
    let response = await fetch(fetchingurl);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page + 1,
      loading: false,
    });
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
              disabled={this.state.status === "error"}
              type="button"
              className="btn btn-dark"
              onClick={this.nextpage}
            >
              {console.log(" page " + this.state.page)}
              {console.log(" status " + this.state.status)}
              {console.log(" tr " + this.state.totalResults)}
              {console.log(" ceil " + Math.ceil(this.state.totalResults / 30))}
              {console.log(
                " dis " + this.state.page >=
                  Math.ceil(this.state.totalResults / 20)
              )}
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
