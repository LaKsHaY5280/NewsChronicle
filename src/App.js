import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Newsbox from './components/Newsbox';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Newsbox category="sports" />
      </div>
    );
  }
}


