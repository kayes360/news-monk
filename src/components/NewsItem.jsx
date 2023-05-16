import React, { Component } from "react";

const NewsItem=(props)=> { 
    let {
      title,
      description,
      thumbnail,
      newsUrl,
      publishedAt,
      author,
      sourceName,
    } = props;
    return (
      <>
        <div className="card ">
          <img src={thumbnail} className="card-img-top img-fluid" alt="..." />

          <div className="card-body">
            <span
              className="position-absolute top-0   translate-middle badge rounded-pill bg-danger z-1"
              style={{ left: "90%" }}
            >
              {sourceName}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title.slice(0, 44)}...</h5>
            <p className="card-text">{description.slice(0, 88)}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(publishedAt).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </>
    ); 
}

export default NewsItem;
