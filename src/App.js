import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/general"
              key="general"
              element={<Newsbox category="general" />}
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={<Newsbox category="entertainment" />}
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={<Newsbox category="sports" />}
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={<Newsbox category="technology" />}
            />
            <Route
              exact
              path="/business"
              key="business"
              element={<Newsbox category="business" />}
            />
            <Route
              exact
              path="/health"
              key="health"
              element={<Newsbox category="health" />}
            />
            <Route
              exact
              path="/science"
              key="science"
              element={<Newsbox category="science" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}


