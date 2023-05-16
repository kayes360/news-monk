import React, { Component, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalresults, setTotalResults] = useState(0);
  //  document.title = `News Monk  || ${this.capitalizeFirstLetter(this.props.category)}`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}&apiKey=597c99bd27524d48a65a28dcb0baa676`;

    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalresults);
    setLoading(false);
  };
  useEffect(() => {
    updateNews();
  }, []);

  const handleNextClick = async () => {
    console.log("next");
    setPage(page+1)
     
    updateNews(); 
  };

  const handlePreviousClick = async () => {
    // this.setState({
    //   page: this.state.page - 1,
    // });
    // let url = `https://newsapi.org/v2/top-headlines?apiKey=597c99bd27524d48a65a28dcb0baa676&country=${
    //   this.props.country
    // }&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${
    //   this.state.page - 1
    // }`;

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    // });
    
    setPage(page-1)
    updateNews();
  };
  // fetchMoreData = async ()=>{
  //   setPage(page+1);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}&apiKey=597c99bd27524d48a65a28dcb0baa676`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setArticles(articles.concat(parsedData.articles))
  //   setTotalResults(parsedData.totalResults)
  // }

  return (
    <>
      {loading && <Spinner />}
      <div className="container">
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePreviousClick}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2> News Monk-Top Headlines</h2>
          <span className="badge text-bg-primary fs-6 text-capitalize">
            {this.props.category}
          </span>
        </div>

        <div className="row">
          {!loading &&
            articles.map((article) => {
              return (
                <div className="col-3 my-3" key={article.url}>
                  <NewsItem
                    title={article.title ? article.title : ""}
                    description={article.description ? article.description : ""}
                    publishedAt={article.publishedAt}
                    author={article.author}
                    sourceName={article.source.name}
                    thumbnail={
                      article.urlToImage
                        ? article.urlToImage
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                    }
                    newsUrl={article.url ? article.url : ""}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );

  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
};

export default News;
