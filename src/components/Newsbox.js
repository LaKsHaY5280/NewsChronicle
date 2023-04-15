import React, { Component } from 'react'

import Newsitems from './Newsitems'

export default class Newsbox extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="my-3 ">Highlights</h2>
        <div className="container my-4">
          <div className="row">
            <div className="col-md-4">
              <Newsitems />
            </div>
            <div className="col-md-4">
              <Newsitems />
            </div>
            <div className="col-md-4">
              <Newsitems />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Newsitems />
            </div>
            <div className="col-md-4">
              <Newsitems />
            </div>
            <div className="col-md-4">
              <Newsitems />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
