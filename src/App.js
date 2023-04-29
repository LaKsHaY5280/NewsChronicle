import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = { progress: 0 };

  newskey = process.env.REACT_APP_NEWSKEY;

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <div>
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Navbar />
          <Routes>
            <Route
              exact
              path="/NewsChronicle"
              key="general"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/general"
              key="general"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="technology"
                />
              }
            />
            <Route
              exact
              path="/business"
              key="business"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/health"
              key="health"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              key="science"
              element={
                <Newsbox
                  setprog={this.setProgress}
                  newskey={this.newskey}
                  category="science"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}


