import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = { progress: 0 };

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
                <Newsbox setprog={this.setProgress} category="general" />
              }
            />
            <Route
              exact
              path="/general"
              key="general"
              element={
                <Newsbox setprog={this.setProgress} category="general" />
              }
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={
                <Newsbox setprog={this.setProgress} category="entertainment" />
              }
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={<Newsbox setprog={this.setProgress} category="sports" />}
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={
                <Newsbox setprog={this.setProgress} category="technology" />
              }
            />
            <Route
              exact
              path="/business"
              key="business"
              element={
                <Newsbox setprog={this.setProgress} category="business" />
              }
            />
            <Route
              exact
              path="/health"
              key="health"
              element={<Newsbox setprog={this.setProgress} category="health" />}
            />
            <Route
              exact
              path="/science"
              key="science"
              element={
                <Newsbox setprog={this.setProgress} category="science" />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}


