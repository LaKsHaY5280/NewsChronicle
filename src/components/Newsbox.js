import React, { Component } from "react";

import Newsitems from "./Newsitems";

export default class Newsbox extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }
  async componentDidMount() {
    let fetchingurl =
      "https://newsapi.org/v2/everything?q=India&apiKey=2df9f61b4103445cb7786b27d42d1265&page=1";
    const response = await fetch(fetchingurl);
    const data = await response.json();

    this.setState({
      articles: data.articles,
      page: 1,
    });
  }

  prevpage = async () => {
    let fetchingurl = `https://newsapi.org/v2/everything?q=India&apiKey=2df9f61b4103445cb7786b27d42d1265&page=${
      this.state.page - 1
    }`;
    let response = await fetch(fetchingurl);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page - 1,
    });
  };

  nextpage = async () => {
    let fetchingurl = `https://newsapi.org/v2/everything?q=India&apiKey=2df9f61b4103445cb7786b27d42d1265&page=${
      this.state.page + 1
    }`;
    let response = await fetch(fetchingurl);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="my-3 ">Highlights</h2>
        <div className="container my-4">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title ? element.title.slice(0, 45) : ""}
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
