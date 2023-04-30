import React from "react";

const Newsitems = (props) => {
  let { title, description, imgurl, newsurl, author, date } = props;

  return (
    <div>
      <div className="card my-3">
        <img
          src={imgurl}
          className="card-img-top"
          alt="It could not be found"
          style={{ height: "200px", width: " 100% " }}
        />
        <div className="card-body ">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsurl} className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default Newsitems;
