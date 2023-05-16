import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `News Monk  || ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=597c99bd27524d48a65a28dcb0baa676`;

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  fetchMore = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=597c99bd27524d48a65a28dcb0baa676`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h2> News Monk-Top Headlines</h2>
          <span className="badge text-bg-primary fs-6 text-capitalize">
            {this.props.category}
          </span>
        </div>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll 
        dataLength={this.state.articles.length}
          next={this.fetchMore}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((article) => {
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
}

export default News;
