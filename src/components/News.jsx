import React, { Component, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
   
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
    setLoading(true)

    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  
    props.setProgress(100);
  }
  useEffect(()=>{
  document.title = `News Monk  || ${capitalizeFirstLetter(  props.category )}`; 
     updateNews();

  },[])
 

  const fetchMore = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}`;
    setPage(page+1);
 
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
 
  };
 
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h2> News Monk-Top Headlines</h2>
          <span className="badge text-bg-primary fs-6 text-capitalize">
            {props.category}
          </span>
        </div>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll 
        dataLength={articles.length}
          next={fetchMore}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {articles.map((article) => {
                return (
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 my-3" key={article.url}>
                    <NewsItem
                      title={article.title ? article.title : ""}
                      description={
                        article.description ? article.description : ""
                      }
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
        </InfiniteScroll>
      </>
    );
  }
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

export default News;
